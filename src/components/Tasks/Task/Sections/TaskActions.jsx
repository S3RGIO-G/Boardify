import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLists } from "../../../../hooks/useLists.js";
import { useTasks } from "../../../../hooks/useTasks.js";
import { useLanguage } from "../../../../hooks/useLanguage.js";
import { useModalConfirm } from "../../../../hooks/useModalConfirm.js";

import FormMoveTask from "../../../Forms/FormMoveTask.jsx";

export default function TaskActions({ task, updateTaskState = () => {} }) {
  const { lists } = useLists();
  const { tasks, switchTasks, deleteTask } = useTasks();
  const [moving, setMoving] = useState(false);
  const [positions, setPositions] = useState([]);
  const [indexes, setIndexes] = useState({});
  const { texts: TEXT } = useLanguage();
  const { hideConfirm, showConfirm } = useModalConfirm();
  const navigate = useNavigate();

  const onDelete = async () => {
    const prev = { ...task };
    hideConfirm();
    updateTaskState(null);
    const res = await deleteTask(task.id, task.idList);
    if (!res) updateTaskState(prev);
    else navigate("../..", { relative: "path" });
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
    const iList = lists.findIndex((l) => l.id === task.idList);
    setIndexes((prev) => ({ ...prev, iList }));
  }, [task]);

  return (
    <aside className="mt-2 w-full sm:w-fit ps-10 sm:ps-2">
      <h3 className="text-xs font-medium">{TEXT?.task.actions.title}</h3>
      <div className="w-full sm:w-[180px] flex gap-4 sm:gap-0 sm:flex-col font-medium">
        {!moving && (
          <>
            <button
              className="btn-medium flex items-center px-3 py-1.5 mt-2 h-8 rounded-sm text-sm hover:text-indigo-600"
              onClick={(e) => {
                updatePos({ target: { value: indexes.iList } });
                setMoving(true);
                e.stopPropagation();
              }}
            >
              <span className="fa-solid fa-arrow-right me-2"></span>
              <span>{TEXT?.task.actions.move}</span>
            </button>

            <button
              className="btn-medium flex items-center px-3 py-1.5 mt-2 h-8 rounded-sm text-sm hover:text-red-600"
              onClick={() => showConfirm(TEXT?.modals.deleteCard, onDelete)}
            >
              <span className="fa-solid fa-trash me-2"></span>
              <span>{TEXT?.task.actions.delete}</span>
            </button>
          </>
        )}

        {moving && (
          <FormMoveTask
            task={task}
            positions={positions}
            lists={lists}
            tasks={tasks}
            indexes={indexes}
            switchTasks={switchTasks}
            updateTaskState={updateTaskState}
            updatePos={updatePos}
            cancelMoving={() => setMoving(false)}
          />
        )}
      </div>
    </aside>
  );
}
