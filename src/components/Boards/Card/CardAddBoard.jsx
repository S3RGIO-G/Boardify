import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { useLanguage } from "../../../hooks/useLanguage";

import Card from "./Card";
import FormInput from "../../Forms/FormInput";

export default function CardAddBoard({ createBoard, userId }) {
  const [creating, setCreating] = useState(false);
  const nav = useNavigate();
  const { texts: TEXT } = useLanguage();

  const onSubmit = async (e) => {
    const name = e.target["inputNameBoard"].value.trim();
    setCreating(false);
    if (!name) return;
    const id = await createBoard(name, userId);
    nav(`/boards/${id}`);
  };
  const classBorders = "rounded-md border-dotted border-4 border-slate-400";

  if (!creating)
    return (
      <Card
        className={`flex w-full justify-center items-center font-bold cursor-pointer hover:bg-[var(--color-light-hover)] text-lg ${classBorders}`}
        onClick={() => setCreating(true)}
      >
        <span className="fas fa-plus mr-1 text-sm sm:text-base"></span>
        {TEXT?.board.addBoard.text}
      </Card>
    );
  else
    return (
      <Card className="flex w-full bg-[var(--color-light-hover)]">
        <FormInput
          name="inputNameBoard"
          btnSubmit={TEXT?.board.addBoard.text}
          placeholder={TEXT?.board.addBoard.placeholder}
          onSubmit={onSubmit}
          onCancel={setCreating}
          className={`flex p-3 flex-col gap-2 w-full  ${classBorders}`}
          classInput="flex w-full px-2.5 py-1.5 outline-primary rounded-md ring-2 ring-slate-300"
          buttons
        />
      </Card>
    );
}
