import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { useUser } from "../hooks/useUser";
import { FormTextArea } from "./FormTextArea";
import { useLanguage } from "../hooks/useLanguage";

export function AddTask({ idList }) {
  const { createTask } = useTasks();
  const { user } = useUser();
  const [writing, setWriting] = useState(false);
  const {
    texts: { board: TEXT },
  } = useLanguage();

  const onSubmit = async (e) => {
    e.preventDefault();
    const { text } = e.target;
    const name = text.value.trim();
    if (!name) return;

    text.value = "";

    await createTask({ name, idList, idUser: user.id });

    const ol = document.querySelector(`ol[data-id="${idList}"]`);
    setTimeout(() => {
      ol.scrollTo({ behavior: "smooth", top: ol.scrollHeight });
    }, 50);
  };

  return (
    <>
      {!writing && (
        <div className="flex h-fit w-full pt-2 px-2">
          <button
            onClick={() => setWriting(true)}
            className="flex h-10 w-full py-[6px] px-2 items-center rounded-md gap-2 font-medium hover:bg-slate-200 text-sm"
          >
            <i className="fas fa-solid fa-plus"></i>
            <span>{TEXT?.addTask.text}</span>
          </button>
        </div>
      )}

      <FormTextArea
        show={writing}
        buttons={true}
        onSubmit={onSubmit}
        changeShow={(data) => setWriting(data)}
        classForm="flex-col px-2 pt-2"
        classText="outline-none shadow-sm shadow-black/50 px-3 py-2 min-h-[76px] max-h-[160px] text-sm"
        btnText={TEXT?.addTask.text}
        placeholder={TEXT?.addTask.placeholder}
      />
    </>
  );
}
