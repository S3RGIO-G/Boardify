import { useEffect, useRef, useState } from "react";
import { FormSelect } from "../FormSelect.jsx";
import { useLists } from "../../hooks/useLists.js";
import { useTasks } from "../../hooks/useTasks.js";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../hooks/useLanguage.js";
import { useModalConfirm } from "../../hooks/useModalConfirm.js";

export function TaskActions({ task, updateTaskState }) {
  const { lists } = useLists();
  const { tasks, switchTasks, deleteTask } = useTasks();
  const [moving, setMoving] = useState(false);
  const [positions, setPositions] = useState([]);
  const [indexes, setIndexes] = useState({});
  const navigate = useNavigate();
  const { texts: TEXT } = useLanguage();
  const { hideModal, setModalAttributes } = useModalConfirm();
  const formRef = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const fromIndex = tasks[task.idList].findIndex((t) => t.id === task.id);
    const toIndex = parseInt(e.target["selectPos"].value);
    const fromList = task.idList;
    const toList = lists[parseInt(e.target["selectLists"].value)].id;
    setMoving(false);

    if (fromList === toList && fromIndex === toIndex) return;
    const res = await switchTasks({ fromList, toList, fromIndex, toIndex });
    if (res) updateTaskState(res);
  };

  const onDelete = async () => {
    const prev = { ...task };
    hideModal();
    updateTaskState(null);
    const res = await deleteTask(task.id, task.idList);
    if (!res) updateTaskState(prev);
    else navigate("../..", { relative: "path" });
  };

  const clickOut = (e) => {
    const { current } = formRef;
    const { target } = e;
    if (current && !current.contains(target)) {
      setMoving(false);
    }
  };

  const updatePos = (e = { target: { value: "0" } }) => {
    const i = parseInt(e.target.value);
    const list = lists[i];
    const pos = tasks[list.id]?.map((t, i) => i + 1) || [];

    if (list.id !== task?.idList) pos.push(pos.length + 1);

    if (tasks[task.idList] && task.idList === list.id) {
      const iTask = tasks[task.idList].findIndex((t) => t.id === task.id);
      setIndexes((prev) => ({ ...prev, iTask }));
    } else setIndexes((prev) => ({ ...prev, iTask: null }));

    setPositions(pos);
  };

  useEffect(() => {
    addEventListener("click", clickOut);
    return () => removeEventListener("click", clickOut);
  }, []);

  useEffect(() => {
    const iList = lists.findIndex((l) => l.id === task.idList);
    setIndexes((prev) => ({ ...prev, iList }));
  }, [task]);

  return (
    <aside className="mt-2 w-full sm:w-fit ps-10 sm:ps-2">
      <h3 className="text-xs font-medium">{TEXT?.task.actions.title}</h3>
      <div className="w-full sm:w-[168px] flex gap-4 sm:gap-0 sm:flex-col">
        {!moving && (
          <>
            <button
              onClick={(e) => {
                updatePos({ target: { value: indexes.iList } });
                setMoving(true);
                e.stopPropagation();
              }}
              className="bg-slate-200 hover:bg-slate-300 flex items-center px-3 py-1.5 mt-2 h-8 rounded-sm text-sm"
            >
              <span className="fa-solid fa-arrow-right me-2"></span>
              <span>{TEXT?.task.actions.move}</span>
            </button>

            <button
              onClick={() =>
                setModalAttributes(true, TEXT?.modals.deleteCard, onDelete)
              }
              className="bg-slate-200 hover:bg-slate-300 flex items-center px-3 py-1.5 mt-2 h-8 rounded-sm text-sm hover:text-red-600"
            >
              <span className="fa-solid fa-trash me-2"></span>
              <span>{TEXT?.task.actions.delete}</span>
            </button>
          </>
        )}

        {moving && (
          <form
            ref={formRef}
            onSubmit={onSubmit}
            className="mt-2 flex flex-col w-full"
          >
            <div className="w-full flex sm:flex-col gap-2 ">
              <FormSelect
                label={TEXT?.task.actions.selects.list}
                options={lists}
                name="selectLists"
                className="w-full"
                actual={indexes.iList}
                defaultValue={indexes.iList}
                actualText={TEXT.form?.selects.current}
                onChange={updatePos}
              />
              <FormSelect
                label={TEXT?.task.actions.selects.pos}
                options={positions}
                name="selectPos"
                className="w-full"
                defaultValue={indexes.iTask}
                actual={indexes.iTask}
                actualText={TEXT.form?.selects.current}
              />
            </div>

            <div className="mt-2 flex gap-2 font-medium">
              <button
                type="submit"
                className="p-2 px-3 btn-primary text-white rounded-md"
              >
                {TEXT?.task.actions.move}
              </button>
              <button
                type="button"
                onClick={() => {
                  // updatePos({ target: { value: "0" } });
                  setMoving(false);
                }}
                className="p-2 px-3 btn-slate rounded-md"
              >
                {TEXT?.task.actions.cancel}
              </button>
            </div>
          </form>
        )}
      </div>
    </aside>
  );
}
