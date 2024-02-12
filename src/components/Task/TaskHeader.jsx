import { useState } from "react";
import { FormTextArea } from "../FormTextArea";
import { useLists } from "../../hooks/useLists";
import { useTasks } from "../../hooks/useTasks";
import { useOwner } from "../../hooks/useOwner";
import { useLanguage } from "../../hooks/useLanguage";

export function TaskHeader({ task, onClose, updateTaskState }) {
  const { lists } = useLists();
  const { tasks, updateTaskList, updateTask } = useTasks();
  const [changeTitle, setChangeTitle] = useState(false);
  const { isOwner } = useOwner();
  const {
    texts: { task: TEXT },
  } = useLanguage();

  const onSumbit = async (e) => {
    e.preventDefault();
    setChangeTitle(false);
    const name = e.target[task.id].value.trim();
    if (!name) return;
    const prevName = task.name;
    const prevTaskList = [...tasks[task.idList]];

    try {
      updateTaskState({ ...task, name });
      await updateTask(task.id, task.idList, { name });
    } catch (err) {
      updateTaskList(task.idList, prevTaskList);
      updateTaskState({ ...task, name: prevName });
    }
  };

  return (
    <div className="flex gap-4 items-start py-2 ps-12 pe-14 relative">
      <span className="flex justify-center items-center h-8 w-8 absolute top-4 left-3">
        <i className="fa-solid fa-hard-drive text-xl"></i>
      </span>

      <div className="w-full select-none">
        <div className="pt-1.5 font-semibold text-[20px] leading-6 ">
          {!changeTitle && isOwner && (
            <h2
              onClick={() => setChangeTitle(true)}
              className="cursor-pointer px-2 py-1.5 min-h-[37px] break-words"
            >
              {task?.name}
            </h2>
          )}

          {!isOwner && (
            <h2 className="cursor-pointer px-2 py-1.5 min-h-[37px] break-words">
              {task?.name}
            </h2>
          )}

          <FormTextArea
            onSubmit={onSumbit}
            autoSelect={true}
            nameText={task?.id}
            changeShow={(data) => setChangeTitle(data)}
            show={changeTitle}
            defaultValue={task?.name}
            classText="h-[37px] leading-6 px-2 py-1.5 rounded-sm outline-primary overflow-hidden"
          ></FormTextArea>
        </div>

        <p className="mt-0.5 ms-2">
          {TEXT?.inList}
          <a className="underline" href="#" onClick={(e) => e.preventDefault()}>
            {lists.map((l) => {
              if (l.id === task?.idList) return l.name;
            })}
          </a>
        </p>
      </div>

      <button
        onClick={onClose}
        className="h-10 w-10 absolute top-3 right-3 rounded-full hover:bg-slate-300 text-xl fa-solid fa-xmark before:flex before:justify-center before:h-[18px]"
      ></button>
    </div>
  );
}
