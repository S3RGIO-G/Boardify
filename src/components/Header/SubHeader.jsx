import { useState } from "react";
import { Link } from "react-router-dom";

import { useOwner } from "../../hooks/useOwner";
import { useLanguage } from "../../hooks/useLanguage";
import { useModalConfirm } from "../../hooks/useModalConfirm";
import ButtonFav from "../Forms/Form/Elements/Button/ButtonFav";
import FormInput from "../Forms/FormInput";

export default function SubHeader({ board, updateBoard, deleteBoard }) {
  const [editing, setEditing] = useState(false);
  const { isOwner } = useOwner();
  const { texts: TEXT } = useLanguage();
  const { showConfirm, hideConfirm } = useModalConfirm();

  const onSubmit = async (e) => {
    try {
      const name = e.target["nameBoard"].value.trim();
      setEditing(false);
      if (!name) return;
      updateBoard(board.id, { name });
    } catch (err) {
      console.error(err.message);
    }
  };

  const onSuccess = async () => {
    hideConfirm();
    await deleteBoard(board.id);
  };

  return (
    <div className="py-3 px-4 flex items-center min-h-14 gap-2 bg-black/25 text-white font-medium ">
      <Link to={"/boards"} className="fas fa-arrow-left w-6 min-w-6 text-2xl" />

      {board ? (
        <>
          {!editing && (
            <h1
              onClick={() => isOwner && setEditing(true)}
              className={`h-full leading-8 text-lg max-w-full text-nowrap overflow-hidden text-ellipsis px-2.5  rounded-sm hover:bg-white/15`}
              style={{ pointerEvents: !isOwner && "none" }}
            >
              {board?.name}
            </h1>
          )}

          {editing && (
            <FormInput
              name="nameBoard"
              defaultValue={board.name}
              onSubmit={onSubmit}
              onCancel={setEditing}
              className="h-full w-6 text-lg text-black"
              classInput="px-2.5 h-full w-full outline-primary rounded-sm"
              autoResize
            />
          )}

          {isOwner && (
            <>
              <ButtonFav
                fav={board?.fav}
                classIcon="w-8 h-8 before:leading-8"
                className="text-xl cursor-pointer"
                onClick={() => updateBoard(board.id, { fav: !board.fav })}
              />

              <button
                onClick={() => showConfirm(TEXT?.modals.deleteBoard, onSuccess)}
                className="fa-solid fa-trash rounded-md bg-red-500 h-8 w-8 px-2"
              ></button>
            </>
          )}
        </>
      ) : (
        <div className=" animate-pulse rounded-md bg-white/15 h-8 w-[250px]"></div>
      )}
    </div>
  );
}
