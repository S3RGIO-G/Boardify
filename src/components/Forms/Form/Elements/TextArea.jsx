import { useEffect, useState } from "react";

export default function TextArea({
  id = "textarea",
  name = "textarea",
  className,
  placeholder,
  defaultValue,
  autoResize,
  autoSelect,
  clickOutside,
  maxLength,
  submitEnter = true,
}) {
  const [prevText, setPevText] = useState(defaultValue);

  const onChange = (e) => {
    if (!autoResize) return;
    const { target } = e;

    target.setAttribute("style", `height:"auto"`);
    target.setAttribute("style", `height:${target.scrollHeight}px`);

    // En los casos que el height:auto no sea el máximo
    if (target.scrollHeight > target.clientHeight)
      target.setAttribute("style", `height:${target.scrollHeight}px`);
  };

  const onInput = (e) => {
    const { value } = e.target;
    const enterPressed = value.match(/\n/g);
    const cleanText = submitEnter ? value.split("\n").join("") : value;
    const length = cleanText.length;

    if (length > maxLength && prevText.length < maxLength) {
      e.target.value = cleanText.split("").splice(0, maxLength).join("");
    } else if (length > maxLength && prevText.length === maxLength)
      e.target.value = prevText;
    else e.target.value = cleanText;

    setPevText(e.target.value);

    if (enterPressed && submitEnter) {
      const newEvent = new Event("submit", { bubbles: true, cancelable: true });
      e.target.form.dispatchEvent(newEvent);
    }
  };

  const onFocus = (e) => {
    if (autoSelect) e.target.select();
    onChange(e);
  };

  useEffect(() => {
    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, []);

  return (
    <textarea
      id={id}
      name={name}
      placeholder={placeholder}
      defaultValue={defaultValue}
      maxLength={maxLength + 1}
      onChange={onChange}
      onFocus={onFocus}
      onInput={onInput}
      className={"resize-none " + className}
      autoFocus
    ></textarea>
  );
}
