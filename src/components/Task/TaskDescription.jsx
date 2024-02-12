import { useState } from "react";
import { FormTextArea } from "../FormTextArea";
import { useTasks } from "../../hooks/useTasks";
import { useOwner } from "../../hooks/useOwner";
import { useLanguage } from "../../hooks/useLanguage";

export function TaskDescription({ task, updateTaskState }) {
  const [editing, setEditing] = useState(false);
  const { updateTask } = useTasks();
  const { isOwner } = useOwner();
  const {
    texts: { task: TEXT },
  } = useLanguage();

  const onSubmit = async (e) => {
    e.preventDefault();
    setEditing(false);
    const description = e.target[task.id].value.trim();
    const res = await updateTask(task.id, task.idList, { description });
    updateTaskState(res);
  };

  return (
    <div className="relative mb-4">
      <div className="flex items-center justify-between w-full h-12 ps-10 py-2 ">
        <span className="fa-solid fa-align-left absolute left-0 text-base w-6 h-6 text-center before:leading-6"></span>

        <h3 className="text-base font-semibold">{TEXT?.description.title}</h3>

        {task?.description && !editing && isOwner && (
          <button
            onClick={() => setEditing(true)}
            className="bg-slate-200 py-1.5 px-3 rounded-[3px] hover:bg-slate-300 font-medium"
          >
            {TEXT?.description.edit}
          </button>
        )}
      </div>

      <div className="ps-10">
        {!editing &&
          task?.hasDescription &&
          task?.description?.split("\n").map((t, i) => (
            <p key={i} className="px-0 first:pt-2 last:pb-2">
              {t}
            </p>
          ))}

        {!editing && !task?.hasDescription && isOwner && (
          <p
            onClick={() => setEditing(true)}
            className="cursor-pointer bg-slate-200 px-3 py-2 min-h-[48px] rounded-md font-semibold"
          >
            {TEXT?.description.noDescOwner}
          </p>
        )}

        {!task?.hasDescription && !isOwner && (
          <p className="bg-slate-200 px-3 py-2 min-h-[48px] rounded-md font-semibold">
            {TEXT?.description.noDescNoOwner}
          </p>
        )}

        <FormTextArea
          nameText={task?.id}
          onSubmit={onSubmit}
          defaultValue={task?.description}
          buttons={true}
          btnText={TEXT?.description.save}
          autoSelect={true}
          show={editing}
          changeShow={(e) => setEditing(e)}
          submitEnter={false}
          classForm="flex-col"
          classText="py-2 px-3 h-12 font-medium outline-primary overflow-hidden"
        />
      </div>
    </div>
  );
}
