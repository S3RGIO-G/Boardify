import { useState } from "react";

export default function Input({
  id,
  className,
  type,
  placeholder,
  label,
  register,
  errorMessage,
  icon = "",
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`${className} relative`}>
      <label
        htmlFor={id}
        className="w-fit text-sm sm:text-base block font-medium"
      >
        {label}
      </label>
      <input
        id={id}
        type={type !== "password" ? type : showPassword ? "text" : "password"}
        placeholder={placeholder}
        autoComplete="off"
        className={`w-full h-[38px] sm:h-[45px] text-lg placeholder:text-lg rounded-md py-1.5 px-3 ring-2 ring-gray-300 focus:outline outline-[3px] ${
          errorMessage
            ? "placeholder:text-red-400 ring-red-300 outline-red-500"
            : "outline-primary"
        }
          ${type === "password" ? "pr-8" : ""}
          ${icon ? "pl-8" : ""}
        `}
        {...register}
      />

      {icon && (
        <i
          className={`${icon} pointer-events-none text-lg absolute left-2 top-[30px] sm:top-[38px]`}
        ></i>
      )}

      {type === "password" && (
        <button
          tabIndex={100}
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className={`w-7 text-lg color-primary absolute top-[30px] sm:top-[38px] right-1 p-0.5 fa-solid ${
            showPassword ? "fa-eye-slash" : "fa-eye"
          }`}
        ></button>
      )}

      {errorMessage && (
        <small className="flex text-red-500 font-bold">{errorMessage}</small>
      )}
    </div>
  );
}
