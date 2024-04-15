import { useState } from "react";

import { useUser } from "../../hooks/useUser";
import { useTasks } from "../../hooks/useTasks";
import { useLanguage } from "../../hooks/useLanguage";

import FormTextArea from "../Forms/FormTextArea";

export default function AddTask({ idList }) {
  const [writing, setWriting] = useState(false);
  const { user } = useUser();
  const { createTask } = useTasks();
  const { texts: TEXT } = useLanguage();

  const onSubmit = async (e) => {
    e.preventDefault();
    const { newTask } = e.target;
    const name = newTask.value.trim();
    if (!name) return;

    newTask.value = "";
    const ol = document.querySelector(`ol[data-id="${idList}"]`);

    setTimeout(() => {
      ol.scrollTo({ behavior: "smooth", top: ol.scrollHeight });
    }, 100);

    await createTask({ name, idList, idUser: user.id });
  };

  if (!writing)
    return (
      <div className="flex h-fit w-full px-2 pt-2 cursor-auto">
        <button
          onClick={() => setWriting(true)}
          className="btn-light flex h-10 w-full py-1.5 px-2 items-center rounded-md gap-2 font-medium text-sm"
        >
          <i className="fas fa-solid fa-plus"></i>
          <span>{TEXT?.board.addTask.text}</span>
        </button>
      </div>
    );
  else
    return (
      <FormTextArea
        nameText="newTask"
        show={writing}
        buttons={true}
        onSubmit={onSubmit}
        changeShow={(data) => setWriting(data)}
        classForm="flex flex-col px-2 pt-2 gap-2"
        classText="outline-none shadow-sm shadow-black/50 px-3 py-2 min-h-[76px] max-h-[160px] text-sm"
        btnText={TEXT?.board.addTask.text}
        placeholder={TEXT?.board.addTask.placeholder}
      />
    );
}
