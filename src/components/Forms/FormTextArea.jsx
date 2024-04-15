import { useRef } from "react";

import Form from "./Form/Form";
import TextArea from "./Form/Elements/TextArea";

export default function FormTextArea({
  buttons = false,
  btnText = "",
  classForm = "",
  classText = "",
  nameText = "",
  maxLength = 400,
  defaultValue,
  autoSelect,
  placeholder,
  submitEnter = true,
  changeShow = () => {},
  onSubmit = () => {},
}) {
  const formRef = useRef(null);

  const clickOutside = (event) => {
    const { current } = formRef;
    if (current && !current.contains(event.target)) changeShow(false);
  };

  return (
    <Form
      ref={formRef}
      onSubmit={onSubmit}
      btnSubmit={btnText}
      buttons={buttons}
      onCancel={() => changeShow(false)}
      classButtons="gap-2 font-medium text-sm"
      className={`flex w-full ${classForm}`}
      btnCancelIcon
    >
      <TextArea
        name={nameText}
        clickOutside={clickOutside}
        maxLength={maxLength}
        defaultValue={defaultValue}
        placeholder={placeholder}
        autoSelect={autoSelect}
        className={`w-full rounded-lg placeholder:text-slate-600 overflow-hidden ${classText}`}
        submitEnter={submitEnter}
        autoResize
      />
    </Form>
  );
}
