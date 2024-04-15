import { useState } from "react";
import { useParams } from "react-router-dom";

import { useUser } from "../../hooks/useUser";
import { useLists } from "../../hooks/useLists";
import { useLanguage } from "../../hooks/useLanguage";

import FormTextArea from "../Forms/FormTextArea";

export default function AddList() {
  const { user } = useUser();
  const { idBoard } = useParams();
  const { createList } = useLists();
  const [writing, setWriting] = useState(false);
  const {
    texts: { board: TEXT },
  } = useLanguage();

  const onSubmit = (e) => {
    setWriting(false);
    const name = e.target["newList"].value.trim();
    if (!name) return;
    createList({ name, idUser: user.id, idBoard });
  };

  return (
    <div className="flex h-max min-w-[284px] px-1.5 font-medium select-none text-sm">
      <button
        onClick={() => setWriting(true)}
        className="flex items-center gap-2 w-full p-3 bg-black/15 hover:bg-black/20 rounded-xl  text-white text-base font-medium"
        style={{ display: writing && "none" }}
      >
        <i className="fas fa-solid fa-plus"></i>
        <span>{TEXT?.addList.text}</span>
      </button>

      {writing && (
        <FormTextArea
          nameText="newList"
          btnText={TEXT?.addList.text}
          placeholder={TEXT?.addList.placeholder}
          changeShow={(data) => setWriting(data)}
          onSubmit={onSubmit}
          classForm="min-h-[109px] flex gap-2 flex-col p-2 bg-slate-100 rounded-xl"
          classText="h-8 pl-3 py-1.5 pr-2 ring-2 ring-slate-200 outline-primary"
          buttons
        />
      )}
    </div>
  );
}
