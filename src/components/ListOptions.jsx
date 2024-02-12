import { useEffect, useRef, useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { useLists } from "../hooks/useLists";
import { useLanguage } from "../hooks/useLanguage";
import { useModalConfirm } from "../hooks/useModalConfirm";
import { FormSelect } from "./FormSelect";

export function ListOptions({ show, changeShow, list, onEdit, styles }) {
  const [moving, setMoving] = useState(false);
  const { lists, deleteList, switchLists } = useLists();
  const { clearTaskList } = useTasks();
  const { hideModal, setModalAttributes } = useModalConfirm();
  const { texts: TEXT } = useLanguage();
  const divRef = useRef(null);

  const clickOutside = (event) => {
    const { current } = divRef;
    const { target } = event;
    if (
      current &&
      !current.contains(target) &&
      !(target.dataset.id === `options-${list.id}`)
    ) {
      setMoving(false);
      changeShow(false);
    }
  };

  const onClear = () => {
    try {
      hideModal();
      clearTaskList(list.id);
    } catch (err) {
      console.error(err.message);
    }
  };

  const onDelete = () => {
    try {
      hideModal();
      deleteList(list.id);
    } catch (err) {
      console.error(err.message);
    }
  };

  const clickOption = (e) => {
    e.stopPropagation();
    const { id } = e.target;
    if (id === "btn-clear")
      setModalAttributes(true, TEXT?.modals.clearList, onClear);
    else setModalAttributes(true, TEXT?.modals.deleteList, onDelete);
    changeShow(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    changeShow(false);
    setMoving(false);
    const toI = parseInt(e.target["selectPos"].value);
    const fromI = lists.findIndex((l) => l.id === list.id);
    if (fromI === toI) return;
    switchLists(fromI, toI);
  };

  useEffect(() => {
    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, []);

  return (
    <div
      ref={divRef}
      className={`z-20 flex-col w-[200px] bg-slate-100 top-full -right-40 absolute shadow-lg shadow-black/25 cursor-auto gap-2 pb-3 rounded-lg
      ${show ? "flex" : "hidden"}
      `}
      style={styles}
    >
      <div className="grid grid-cols-[32px_1fr_32px] items-center px-2 py-1 font-medium border-b-2 ">
        <h2 className="col-start-2 w-full h-10 leading-10 text-center text-sm">
          {TEXT?.board?.options.text}
        </h2>
        <button
          onClick={() => changeShow(false)}
          className="flex justify-center items-center h-8 w-8 p-1.5 hover:bg-slate-300 rounded-lg"
        >
          <i className="fa-solid fa-xmark w-16"></i>
        </button>
      </div>

      {!moving && (
        <ol className="flex flex-col w-full text-sm">
          <li>
            <button
              onClick={onEdit}
              className="flex justify-between items-center w-full px-4 text-start py-1.5 hover:bg-slate-200 hover:text-indigo-600"
            >
              {TEXT?.board?.options.edit}
              <i className="fa-solid fa-pencil"></i>
            </button>
          </li>

          <li>
            <button
              onClick={() => setMoving(true)}
              className="flex justify-between items-center w-full px-4 text-start py-1.5 hover:bg-slate-200 hover:text-cyan-600"
            >
              {TEXT?.board?.options.move}
              <i className="fa-solid fa-up-down-left-right"></i>
            </button>
          </li>

          <li>
            <button
              id="btn-clear"
              onClick={clickOption}
              className="flex justify-between items-center w-full px-4 text-start py-1.5 hover:bg-slate-200 hover:text-yellow-600"
            >
              {TEXT?.board?.options.clear}
              <i className="fa-solid fa-recycle"></i>
            </button>
          </li>

          <li>
            <button
              id="btn-delete"
              onClick={clickOption}
              className="flex justify-between items-center w-full px-4 text-start py-1.5 hover:bg-slate-200 hover:text-red-600"
            >
              {TEXT?.board?.options.delete}
              <i className="fa-solid fa-trash-can"></i>
            </button>
          </li>
        </ol>
      )}

      {moving && (
        <form onSubmit={onSubmit} className="px-4 h-full pt-1">
          <FormSelect
            label={TEXT?.task?.actions.selects.pos}
            options={lists?.map((l, i) => i + 1)}
            name="selectPos"
            className="w-full"
          />

          <div className="mt-3 flex gap-2 font-medium text-sm">
            <button
              type="submit"
              className="p-2 px-3 btn-primary text-white rounded-md"
            >
              {TEXT?.task?.actions.move}
            </button>
            <button
              type="button"
              onClick={() => setMoving(false)}
              className="p-2 px-3 btn-slate rounded-md"
            >
              {TEXT?.task?.actions.cancel}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
