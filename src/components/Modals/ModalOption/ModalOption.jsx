import { useEffect, useRef, useState } from "react";

import { useTasks } from "../../../hooks/useTasks";
import { useLists } from "../../../hooks/useLists";
import { useLanguage } from "../../../hooks/useLanguage";
import { useModalConfirm } from "../../../hooks/useModalConfirm";

import HeaderOptions from "./HeaderOptions";
import ActionItem from "./ActionItem";
import FormMoveList from "../../Forms/FormMoveList";

export default function ModalOption({ hideOptions, list, onEdit, styles }) {
  const divRef = useRef(null);
  const [moving, setMoving] = useState(false);
  const { lists, deleteList, switchLists } = useLists();
  const { texts: TEXT } = useLanguage();
  const { clearTaskList } = useTasks();
  const { hideConfirm, showConfirm } = useModalConfirm();

  const clickOutside = (event) => {
    const { current } = divRef;
    const { target } = event;

    if (current && !current.contains(target)) hideOptions();
  };

  const onClear = () => {
    try {
      hideConfirm();
      clearTaskList(list.id);
    } catch (err) {
      console.error(err.message);
    }
  };

  const onDelete = () => {
    try {
      hideConfirm();
      deleteList(list.id);
    } catch (err) {
      console.error(err.message);
    }
  };

  const clickOption = (e) => {
    const { id } = e.target;

    if (id === "btn-clear") showConfirm(TEXT?.modals.clearList, onClear);
    else showConfirm(TEXT?.modals.deleteList, onDelete);
    hideOptions();
  };

  useEffect(() => {
    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, []);

  return (
    <div
      ref={divRef}
      className="z-20 flex-col w-[200px] bg-slate-100 top-2 -right-40 absolute shadow-lg shadow-black/25 cursor-auto gap-3 rounded-lg border-slate-300 border"
      style={styles}
    >
      <HeaderOptions
        title={TEXT?.board?.options.text}
        onCancel={() => hideOptions()}
      />

      {!moving && (
        <main className="flex flex-col w-full text-sm font-medium py-3">
          <ActionItem
            text={TEXT?.board?.options.edit}
            onClick={onEdit}
            icon="fa-solid fa-pencil"
            className="hover:text-purple-600"
          />
          <ActionItem
            text={TEXT?.board?.options.move}
            onClick={() => setMoving(true)}
            icon="fa-solid fa-up-down-left-right"
            className="hover:text-indigo-600"
          />
          <ActionItem
            id="btn-clear"
            text={TEXT?.board?.options.clear}
            onClick={clickOption}
            icon="fa-solid fa-recycle"
            className="hover:text-orange-600"
          />
          <ActionItem
            id="btn-delete"
            text={TEXT?.board?.options.delete}
            onClick={clickOption}
            icon="fa-solid fa-trash-can"
            className="hover:text-red-600"
          />
        </main>
      )}

      {moving && (
        <FormMoveList
          list={list}
          lists={lists}
          switchLists={switchLists}
          onCancel={() => setMoving(false)}
          hideModal={hideOptions}
        />
      )}
    </div>
  );
}
