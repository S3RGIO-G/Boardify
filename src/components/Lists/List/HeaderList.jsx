import { useState } from "react";

import { useLists } from "../../../hooks/useLists";

import FormTextArea from "../../Forms/FormTextArea";
import ModalOption from "../../Modals/ModalOption/ModalOption";

export default function HeaderList({ list, dragHandleProps, isOwner }) {
  const [editing, setEditing] = useState(false);
  const [show, setShow] = useState(false);
  const { updateList } = useLists();

  const styleTitle = {
    cursor: isOwner && "pointer",
    pointerEvents: !isOwner && "none",
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setEditing(false);
    const name = e.target[list.id].value.trim();
    if (!name || name === list.name) return;
    updateList(list.id, { name });
  };

  return (
    <header
      className="flex relative justify-between items-start p-2"
      {...dragHandleProps}
    >
      <div className="w-[220px] text-sm font-medium">
        {!editing && (
          <h2
            style={styleTitle}
            onClick={() => isOwner && setEditing(true)}
            className="break-words flex-wrap ps-3 py-1.5 pe-2 font-medium"
          >
            {list.name}
          </h2>
        )}

        {editing && (
          <FormTextArea
            autoSelect={true}
            nameText={list.id}
            maxLength={300}
            defaultValue={list.name}
            onSubmit={onSubmit}
            changeShow={(data) => setEditing(data)}
            classText="h-8 pl-3 py-1.5 pr-2 ring-2 ring-slate-200 outline-primary"
          />
        )}
      </div>

      <button
        data-id={`options-${list?.id}`}
        onClick={() => isOwner && setShow(!show)}
        className="btn-light fa-solid fa-ellipsis rounded-lg h-8 w-8 before:leading-8 "
        style={{ pointerEvents: !isOwner && "none" }}
      ></button>

      {show && (
        <ModalOption
          list={list}
          hideOptions={() => setShow(false)}
          onEdit={() => {
            setEditing(true);
            setShow(false);
          }}
        />
      )}
    </header>
  );
}
