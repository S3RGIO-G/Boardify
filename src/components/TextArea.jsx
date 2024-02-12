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

  const onKeyDown = (e) => {
    if (e.key === "Enter" && submitEnter) {
      e.preventDefault();
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
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      className={"resize-none " + className}
      placeholder={placeholder}
      maxLength={maxLength}
    ></textarea>
  );
}
