import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOwner } from "../hooks/useOwner";
import { useLanguage } from "../hooks/useLanguage";
import { useModalConfirm } from "../hooks/useModalConfirm";

export function SubHeader({ board, updateBoard, deleteBoard }) {
  const [editing, setEditing] = useState(false);
  const { isOwner } = useOwner();
  const nav = useNavigate();
  const ref = useRef(null);
  const {
    texts: { modals: TEXT },
  } = useLanguage();

  const { setModalAttributes, hideModal } = useModalConfirm();

  useEffect(() => {
    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, []);

  const clickOutside = (e) => {
    const { current } = ref;
    if (current && !current.contains(e.target)) setEditing(false);
  };

  const onChange = (e) => {
    const { parentElement } = e.target;
    parentElement.setAttribute("style", `width:"auto"`);
    parentElement.setAttribute("style", `width:${e.target.scrollWidth}px`);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const name = ref.current.value.trim();
      setEditing(false);
      if (!name) return;
      updateBoard(board.id, { name });
    } catch (err) {
      console.error(err.message);
    }
  };

  const onSuccess = async () => {
    hideModal();
    await deleteBoard(board.id);
  };

  const openModal = () => {
    setModalAttributes(true, TEXT?.deleteBoard, onSuccess);
  };

  return (
    <div className="py-3 px-4 flex items-center min-h-14 gap-2 bg-black/25 text-white font-medium ">
      <button
        onClick={() => nav("/boards")}
        className="fas fa-arrow-left h-full w-8 min-w-8 text-2xl"
      ></button>

      {board ? (
        <>
          {!editing && (
            <h1
              onClick={() => isOwner && setEditing(true)}
              className={`h-full leading-8 text-lg max-w-full text-nowrap overflow-hidden text-ellipsis px-2.5  rounded-sm ${
                isOwner ? "cursor-pointer hover:bg-white/15" : ""
              }`}
            >
              {board?.name}
            </h1>
          )}

          {editing && (
            <form onSubmit={onSubmit} className="h-full w-10 max-w-full">
              <input
                name="inputNameBoard"
                ref={ref}
                autoFocus
                type="text"
                maxLength={100}
                defaultValue={board?.name}
                onChange={onChange}
                onFocus={(e) => {
                  e.target.select();
                  onChange(e);
                }}
                className="flex text-[18px] text-black px-2.5 h-full w-full focus:outline outline-2 focus:outline-[#955acd] rounded-sm"
              />
            </form>
          )}

          {isOwner && (
            <>
              <button
                onClick={() =>
                  isOwner && updateBoard(board.id, { fav: !board.fav })
                }
                className={`text-lg ${board?.fav ? "text-yellow-300" : ""} ${
                  isOwner ? "cursor-pointer" : "cursor-default"
                }`}
              >
                <span
                  className={`fa-star w-8 h-8 before:leading-8 ${
                    board?.fav ? "fa-solid" : "fa-regular"
                  }`}
                ></span>
              </button>

              <button
                onClick={openModal}
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
