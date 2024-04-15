import { useEffect, useRef } from "react";

import { useLanguage } from "../../hooks/useLanguage";

import Form from "./Form/Form";
import Select from "./Form/Elements/Select";

export default function FormMoveTask({
  task,
  lists,
  tasks,
  positions,
  indexes,
  cancelMoving = () => {},
  updatePos = () => {},
  switchTasks = async () => {},
  updateTaskState = async () => {},
}) {
  const formRef = useRef(null);
  const { texts: TEXT } = useLanguage();

  const clickOut = (e) => {
    const { current } = formRef;
    const { target } = e;
    if (current && !current.contains(target)) {
      cancelMoving();
    }
  };

  const onSubmit = async (e) => {
    const fromIndex = tasks[task.idList].findIndex((t) => t.id === task.id);
    const toIndex = parseInt(e.target["selectPos"].value);
    const fromList = task.idList;
    const toList = lists[parseInt(e.target["selectLists"].value)].id;
    cancelMoving();

    if (fromList === toList && fromIndex === toIndex) return;
    const res = await switchTasks({ fromList, toList, fromIndex, toIndex });
    if (res) updateTaskState(res);
  };

  useEffect(() => {
    document.addEventListener("click", clickOut);
    return () => document.removeEventListener("click", clickOut);
  }, []);

  return (
    <Form
      ref={formRef}
      btnSubmit={TEXT?.task.actions.move}
      btnCancel={TEXT?.task.actions.cancel}
      onSubmit={onSubmit}
      onCancel={() => cancelMoving()}
      className="mt-2 flex flex-col gap-2 w-full"
      classButtons="flex gap-2 font-medium"
      buttons
    >
      <div className="w-full flex sm:flex-col gap-2 ">
        <Select
          label={TEXT?.task.actions.selects.list}
          options={lists}
          name="selectLists"
          className="w-1/2 sm:w-full"
          actual={indexes.iList}
          defaultValue={indexes.iList}
          actualText={TEXT.form?.selects.current}
          onChange={updatePos}
        />
        <Select
          label={TEXT?.task.actions.selects.pos}
          options={positions}
          name="selectPos"
          className="w-1/2 sm:w-full"
          defaultValue={indexes.iTask}
          actual={indexes.iTask}
          actualText={TEXT.form?.selects.current}
        />
      </div>
    </Form>
  );
}
