import { useState } from "react";
import { FormTextArea } from "./FormTextArea";
import { useUser } from "../hooks/useUser";
import { useLists } from "../hooks/useLists";
import { useParams } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";

export function AddList() {
  const { user } = useUser();
  const { idBoard } = useParams();
  const { createList } = useLists();
  const [writing, setWriting] = useState(false);
  const {
    texts: { board: TEXT },
  } = useLanguage();

  const onSubmit = (e) => {
    e.preventDefault();
    setWriting(false);
    const name = e.target["newList"].value.trim();
    if (!name) return;
    createList({ name, idUser: user.id, idBoard });
  };

  return (
    <div className="flex h-full min-w-[284px] px-1.5 text-sm font-medium select-none">
      {!writing && (
        <button
          onClick={() => setWriting(true)}
          className="flex items-center gap-2 w-full h-fit p-3 bg-black/10 hover:bg-black/15 rounded-xl mb-2  text-white font-medium"
        >
          <i className="fas fa-solid fa-plus"></i>
          <span>{TEXT?.addList.text}</span>
        </button>
      )}

      <FormTextArea
        nameText="newList"
        onSubmit={onSubmit}
        show={writing}
        classForm="h-fit flex-col p-2 bg-slate-100 rounded-xl"
        classText="h-8 py-1.5 px-3 outline-primary overflow-y-hidden"
        changeShow={(data) => setWriting(data)}
        buttons={true}
        placeholder={TEXT?.addList.placeholder}
        btnText={TEXT?.addList.text}
      />
    </div>
  );
}
