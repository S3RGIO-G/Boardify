import { useLanguage } from "../../hooks/useLanguage";

import Form from "./Form/Form";
import Select from "./Form/Elements/Select";

export default function FormMoveList({
  lists,
  list,
  switchLists = () => {},
  onCancel = () => {},
  hideModal = () => {},
}) {
  const { texts } = useLanguage();

  const onSubmit = (e) => {
    hideModal();
    const toI = parseInt(e.target["selectPos"].value);
    const fromI = lists.findIndex((l) => l.id === list.id);
    if (fromI === toI) return;
    switchLists(fromI, toI);
  };

  return (
    <Form
      onSubmit={onSubmit}
      onCancel={onCancel}
      className="flex flex-col px-4 h-full py-3 gap-2"
      classButtons="gap-2 font-medium text-sm"
      btnSubmit={texts.task?.actions.move}
      btnCancel={texts.task?.actions.cancel}
      buttons
    >
      <Select
        label={texts.task?.actions.selects.pos}
        options={lists?.map((l, i) => i + 1)}
        actual={lists.findIndex((l) => l.id === list.id)}
        actualText={texts.form?.selects.current}
        defaultValue={lists.findIndex((l) => l.id === list.id)}
        name="selectPos"
        className="w-full"
      />
    </Form>
  );
}
