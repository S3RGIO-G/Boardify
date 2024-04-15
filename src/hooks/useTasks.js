import { useContext } from "react";

import { Context } from "../context/GlobalContext";

import { getTasksByField, updateTaskById, addTask, deleteTasksByField, deleteTasksById } from "../services/task.service";

export function useTasks() {
  const { tasks, setTasks } = useContext(Context);

  const loadTasks = async (ids) => {
    try {
      if (!ids.length) return setTasks({});
      const promises = ids.map(id => getTasksByField("idList", id));
      const res = await Promise.all(promises);
      ids.forEach((id, i) => setTasks(prev => ({ ...prev, [id]: res[i] })));
    } catch (err) {
      console.error(err.message);
    }
  }

  const switchTasks = async ({ fromList, toList, fromIndex, toIndex }) => {
    const prevState = JSON.parse(JSON.stringify(tasks));

    try {
      if (fromList === toList) return await switchTasksVentically(toList, fromIndex, toIndex);
      else return await switchTasksHorizontally(fromList, toList, fromIndex, toIndex);
    } catch (err) {
      console.error(err.message);
      setTasks(prevState);
    }
  };

  const switchTasksVentically = async (idList, fromI, toI) => {
    const list = tasks[idList];
    const from = list[fromI];
    const to = list[toI];

    if (toI === 0) from.position = to.position * 0.9; //Firts position
    else if (toI === list.length - 1) from.position = to.position * 1.1; // Last position
    else if (fromI < toI) { //Top to bottom
      from.position = to.position + (list[toI + 1].position - to.position) * 0.1;
    } else { //Bottom to Top
      from.position = to.position - (to.position - list[toI - 1].position) * 0.1;
    }
    return await updateTask(from.id, from.idList, { position: from.position });
  }

  const switchTasksHorizontally = async (fromList, toList, fromI, toI) => {
    const list = tasks[toList];
    const from = tasks[fromList][fromI];
    const to = list[toI];

    if (toI === 0 && to) from.position = to.position * 0.9; //Task to first index
    else if (toI === 0 && !to) from.position = 10000; //First Task
    else if (toI === list.length) from.position = list[toI - 1].position * 1.1; //Task to last index
    else { //Task between other tasks
      const distance = to.position - list[toI - 1].position;
      from.position = to.position - (distance * 0.1);
    }

    from.idList = toList;
    list.push(from);
    tasks[fromList].splice(fromI, 1);

    const newActivity = { from: fromList, to: toList, time: Date.now() };
    return await updateTask(from.id, toList, { position: from.position, idList: toList, newActivity });
  }

  const createTask = async ({ name, idList, idUser }) => {
    const prev = [...tasks[idList]];
    const list = tasks[idList];
    const last = list[list.length - 1];
    const pos = last ? last.position + 5000 : 10000;

    const task = {
      name,
      idList,
      idUser,
      created: Date.now(),
      updated: Date.now(),
      description: "",
      hasDescription: false,
      position: pos,
      activity: [{
        from: idList,
        to: idList,
        time: Date.now()
      }]
    }

    try {
      const tempId = Date.now().toString();
      list.push({ ...task, id: tempId });
      updateTaskList(idList, list);
      const { id } = await addTask(task);
      const i = list.findIndex(l => l.position === task.position)
      list[i].id = id;
      updateTaskList(idList, list);
    } catch (err) {
      updateTaskList(idList, prev);
      console.error(err.message);
    }
  }

  const updateTask = async (id, idList, data) => {
    const list = tasks[idList];
    const i = list.findIndex(task => task.id === id);

    if (data.newActivity) {
      const prevAct = list[i].activity[0];
      const diference = (Date.now() - prevAct.time) / 1000 / 60;

      if (data.newActivity.to === prevAct.from && diference < 1.2) {
        list[i].activity.shift();
        data.activity = [...list[i].activity];
      }
      else {
        data.activity = [data.newActivity, ...list[i].activity];
      }
      data.newActivity = undefined;
    }

    if (data.description !== undefined && !data.description) data.hasDescription = false;
    else if (data.description !== undefined && data.description) data.hasDescription = true;

    list[i] = { ...list[i], ...data };

    if (data.position) list.sort((x, y) => x.position > y.position ? 1 : x.position < y.position ? -1 : 0);

    updateTaskList(idList, list);
    return await updateTaskById(id, { ...data, updated: Date.now() });
  }

  const deleteTask = async (id, idList) => {
    const prev = [...tasks[idList]];
    try {
      const taskList = tasks[idList];
      const i = taskList.findIndex(t => t.id === id);

      taskList.splice(i, 1);
      updateTaskList(idList, taskList);
      return await deleteTasksById(id);
    } catch (err) {
      console.error(err.message);
      updateTaskList(idList, prev);
      return null;
    }
  };

  const updateTaskList = (idTasksList, tasksList) => {
    setTasks(prev => ({ ...prev, [idTasksList]: tasksList }));
  }

  const clearTaskList = async (idList) => {
    const prev = [...tasks[idList]];
    try {
      updateTaskList(idList, []);
      await deleteTasksByField('idList', idList);
    } catch (err) {
      updateTaskList(idList, prev);
      throw Error(err.message);
    }
  }

  const resetTasks = () => {
    setTasks(null);
  }

  return { tasks, loadTasks, switchTasks, createTask, updateTask, deleteTask, updateTaskList, clearTaskList, resetTasks }
}