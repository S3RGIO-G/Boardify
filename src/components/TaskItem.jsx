import { Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { FormTextArea } from "./FormTextArea";
import { useNavigate } from "react-router-dom";
import { useOwner } from "../hooks/useOwner";

export function TaskItem({ task, index }) {
  const { tasks, updateTask, updateTaskList } = useTasks();
  const [editing, setEditing] = useState(false);
  const nav = useNavigate();
  const { isOwner } = useOwner();

  const onClickBtn = (e) => {
    e.stopPropagation();
    setEditing(true);
    e.target.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setEditing(false);
    const name = e.target[task.id].value.trim();
    if (!name) return;
    const prev = [...tasks[task.idList]];
    try {
      await updateTask(task.id, task.idList, { name });
    } catch (err) {
      updateTaskList(task.idList, prev);
      console.error(err.message);
    }
  };

  return (
    <Draggable
      draggableId={task.id}
      index={index}
      isDragDisabled={!isOwner}
    >
      {(provided) => (
        <li
          data-id={task.id}
          className="grid pb-2 !cursor-pointer text-[#172b4d] text-sm "
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <div
            onClick={() => nav(`card/${task.id}`)}
            className={`min-h-[36px] h-full relative shadow-sm shadow-black/25 px-3 pt-2 pb-1 bg-white         rounded-lg cursor-pointer hover:outline hover:outline-2 outline-primary break-words overflow-hidden group text-sm
              ${editing ? "hidden" : "flex-wrap"}`}
          >
            {task.name}

            {isOwner && (
              <button
                onClick={onClickBtn}
                className="invisible group-hover:visible items-center justify-center absolute right-0.5 top-0.5 hover:bg-slate-200 rounded-full h-8 w-8 py-1.5 px-2 z-10"
              >
                <i className="fa-solid fa-pencil pointer-events-none"></i>
              </button>
            )}
          </div>

          <FormTextArea
            show={editing}
            autoSelect={true}
            onSubmit={onSubmit}
            changeShow={(data) => setEditing(data)}
            defaultValue={task.name}
            nameText={task.id}
            classText="h-9 px-3 pt-2 pb-1 outline-primary overflow-y-hidden text-sm"
          />
        </li>
      )}
    </Draggable>
  );
}
