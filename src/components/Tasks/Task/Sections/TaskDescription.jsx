import { useState } from "react";

import { useTasks } from "../../../../hooks/useTasks";
import { useOwner } from "../../../../hooks/useOwner";
import { useLanguage } from "../../../../hooks/useLanguage";

import FormTextArea from "../../../Forms/FormTextArea";

export default function TaskDescription({ task, updateTaskState }) {
  const [editing, setEditing] = useState(false);
  const { updateTask } = useTasks();
  const { isOwner } = useOwner();
  const { texts: TEXT } = useLanguage();
  const hasDesc = task?.hasDescription;
  const classDesc = !hasDesc && "px-4 bg-slate-200 rounded-md";

  const onSubmit = async (e) => {
    e.preventDefault();
    setEditing(false);
    const description = e.target[task.id].value.trim();
    const res = await updateTask(task.id, task.idList, { description });
    updateTaskState(res);
  };

  return (
    <section className="relative mb-4">
      <div className="flex items-center justify-between w-full h-12 ps-10 py-2 ">
        <span className="fa-solid fa-align-left absolute left-0 text-base w-6 h-6 text-center before:leading-6"></span>

        <h3 className="text-base font-semibold">
          {TEXT?.task.description.title}
        </h3>

        {task?.description && !editing && isOwner && (
          <button
            onClick={() => setEditing(true)}
            className="bg-slate-200 py-1.5 px-3 rounded-[3px] hover:bg-slate-300 font-medium"
          >
            {TEXT?.task.description.edit}
          </button>
        )}
      </div>

      <div className="ps-10">
        {!editing && (
          <div
            onClick={() => isOwner && setEditing(true)}
            className={`cursor-pointer min-h-14 py-2 ${classDesc}`}
            style={{ pointerEvents: (!isOwner || hasDesc) && "none" }}
          >
            {hasDesc &&
              task?.description?.split("\n").map((t, i) => (
                <p key={i} className="break-words">
                  {t ? t : "‎"}
                </p>
              ))}

            {!hasDesc && (
              <p className="font-semibold">
                {isOwner
                  ? TEXT?.task.description.noDescOwner
                  : TEXT?.task.description.noDescNoOwner}
              </p>
            )}
          </div>
        )}

        {editing && (
          <FormTextArea
            nameText={task?.id}
            defaultValue={task?.description}
            btnText={TEXT?.task.description.save}
            submitEnter={false}
            onSubmit={onSubmit}
            changeShow={(e) => setEditing(e)}
            classForm="flex-col gap-2"
            classText="py-2 px-3 h-14 outline-primary ring-2 ring-slate-200"
            buttons
            autoSelect
          />
        )}
      </div>
    </section>
  );
}
