import { useEffect, useState } from "react";

export default function Select({
  label = "",
  className = "",
  name = "",
  options,
  actual,
  defaultValue = 0,
  actualText = "(current)",
  onChange = () => {},
}) {
  const [selected, setSelected] = useState(defaultValue);
  const text = options[selected]?.name || options[selected];

  const getString = (value, maxLength = 999) => {
    const text = value.toString();
    const length = text.length;
    const shortText = text.split("").splice(0, maxLength).join("");

    return shortText + (length > maxLength ? "... " : " ");
  };

  useEffect(() => {
    if (selected > options.length - 1) setSelected(options.length - 1);
  }, [options]);

  return (
    <div
      className={`py-1.5 px-3 relative btn-medium rounded-md ${className}`}
    >
      <label htmlFor={name} className="text-xs font-medium pointer-events-none">
        {label}
      </label>
      <p className="text-sm font-semibold text-ellipsis overflow-hidden pointer-events-none">
        {getString(text, 10)}
        {actual === parseInt(selected) && actualText}
      </p>

      <select
        name={name}
        id={name}
        value={selected}
        className="h-full w-full absolute top-0 left-0 opacity-0 cursor-pointer text-ellipsis "
        onChange={(e) => {
          setSelected(e.target.value);
          onChange(e);
        }}
      >
        {options.map((o, i) => {
          const text = o.name || o;
          return (
            <option key={i} value={i}>
              {getString(text, 10)} {actual === i && actualText}
            </option>
          );
        })}
      </select>
    </div>
  );
}
