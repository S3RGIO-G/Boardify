import { useEffect, useRef } from "react";
import Form from "./Form/Form";

export default function FormInput({
  buttons = false,
  btnSubmit = "",
  name = "inputForm",
  placeholder = "",
  maxLength = 100,
  defaultValue = "",
  className = "",
  classInput = "",
  onSubmit = () => {},
  onCancel = () => {},
  autoResize = false,
}) {
  const formRef = useRef(null);

  const clickOutside = (event) => {
    const { current } = formRef;
    if (current && !current.contains(event.target)) onCancel(false);
  };

  const onChange = (e) => {
    if (!autoResize) return;

    const { parentElement } = e.target;
    parentElement.setAttribute("style", `width:"auto"`);
    parentElement.setAttribute("style", `width:${e.target.scrollWidth}px`);
  };

  const onFocus = (e) => {
    e.target.select();
    onChange(e);
  };

  useEffect(() => {
    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, []);

  return (
    <Form
      ref={formRef}
      btnSubmit={btnSubmit}
      buttons={buttons}
      onSubmit={onSubmit}
      onCancel={() => onCancel(false)}
      className={className}
      classButtons="gap-2 font-medium text-sm"
      btnCancelIcon
    >
      <input
        name={name}
        type="text"
        autoComplete="off"
        placeholder={placeholder}
        maxLength={maxLength}
        defaultValue={defaultValue}
        className={classInput}
        onChange={onChange}
        onFocus={onFocus}
        autoFocus
      />
    </Form>
  );
}
