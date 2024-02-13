import { useEffect } from "react";

export function TextArea({
  name,
  className,
  placeholder,
  defaultValue,
  autoResize,
  autoSelect,
  clickOutside,
  maxLength,
  submitEnter = true,
}) {
  const onChange = (e) => {
    if (!autoResize) return;
    const { target } = e;
    target.setAttribute("style", `height:"auto"`);
    target.setAttribute("style", `height:${target.scrollHeight}px`);
  };

  const onInput = (e) => {
    const { value } = e.target;
    const array = value.split("");
    array.pop();
    if (value.match(/\n/g) && submitEnter) {
      e.target.value = array.join("");
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
      name={name || "text"}
      autoFocus
      defaultValue={defaultValue}
      onChange={onChange}
      onFocus={onFocus}
      className={"resize-none " + className}
      placeholder={placeholder}
      maxLength={maxLength}
      inputMode="url"
      onInput={onInput}
    ></textarea>
  );
}
