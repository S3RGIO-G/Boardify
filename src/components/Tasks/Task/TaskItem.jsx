import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Draggable } from "@hello-pangea/dnd";

import { useTasks } from "../../../hooks/useTasks";
import { useOwner } from "../../../hooks/useOwner";

import FormTextArea from "../../Forms/FormTextArea";

export default function TaskItem({ task, index }) {
  const [editing, setEditing] = useState(false);

  const { tasks, updateTask, updateTaskList } = useTasks();
  const { isOwner } = useOwner();
  const nav = useNavigate();

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
    <Draggable draggableId={task.id} index={index} isDragDisabled={!isOwner}>
      {(provided) => (
        <li
          data-id={task.id}
          className="pb-2 cursor-pointer text-[#172b4d] text-sm"
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          {!editing && (
            <div
              onClick={() => nav(`card/${task.id}`)}
              className="min-h-[36px] relative shadow-sm shadow-black/25 px-3 pt-2 pb-1 bg-white rounded-lg cursor-pointer outline-primary break-words overflow-hidden group"
            >
              {task.name}

              {isOwner && (
                <button
                  onClick={onClickBtn}
                  className="invisible hidden sm:block group-hover:visible items-center justify-center absolute right-0.5 top-0.5 hover:bg-slate-200 rounded-full h-8 w-8 py-1.5 px-2 z-10"
                >
                  <i className="fa-solid fa-pencil pointer-events-none"></i>
                </button>
              )}
            </div>
          )}

          {editing && (
            <FormTextArea
              autoSelect={true}
              onSubmit={onSubmit}
              changeShow={(data) => setEditing(data)}
              defaultValue={task.name}
              nameText={task.id}
              classText="h-9 px-3 pt-2 pb-1 ring-2 ring-slate-200 outline-primary"
            />
          )}
        </li>
      )}
    </Draggable>
  );
}
