import { useEffect, useRef, useState } from "react";

export function FormSelect({
  label,
  className,
  name,
  options,
  onChange,
  actual,
  actualText = "(current)",
  defaultValue = 0
}) {
  const ref = useRef(null);
  const [indexSelected, setIndexSelected] = useState(defaultValue);

  useEffect(() => {
    if (indexSelected > options.length - 1)
      setIndexSelected(options.length - 1);
  }, [options]);

  return (
    <div
      className={`py-1.5 px-3 relative bg-slate-200 hover:bg-slate-300 rounded-md ${
        className || ""
      }`}
    >
      <label htmlFor={name} className="text-xs font-medium pointer-events-none">
        {label}
      </label>
      <p className="text-sm font-semibold text-ellipsis overflow-hidden pointer-events-none">
        {options[indexSelected]?.name || options[indexSelected]}{" "}
        {actual === parseInt(indexSelected) && actualText}
      </p>

      <select
        onChange={(e) => {
          setIndexSelected(e.target.value);
          if (onChange) onChange(e);
        }}
        ref={ref}
        name={name}
        id={name}
        value={indexSelected}
        className="h-full w-full absolute top-0 left-0 opacity-0 cursor-pointer text-ellipsis "
      >
        {options.map((o, i) => (
          <option key={i} value={i}>
            {o.name || o} {actual === i && actualText}
          </option>
        ))}
      </select>
    </div>
  );
}
