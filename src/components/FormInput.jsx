import { useState } from "react";

export function FormInput({
  id,
  className,
  type,
  placeholder,
  label,
  register,
  errorMessage,
  icon,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`${className} relative`}>
      <label
        htmlFor={id}
        className="w-fit text-sm sm:text-base md:text-lg block font-medium"
      >
        {label}
      </label>
      <input
        id={id}
        type={type !== "password" ? type : showPassword ? "text" : "password"}
        placeholder={placeholder}
        autoComplete="true"
        className={`w-full h-[38px] sm:h-[42px] md:h-[45px] text-lg placeholder:text-lg rounded-md py-1.5 px-3 ring-2 ring-gray-300 focus:outline outline-[3px] ${
          errorMessage
            ? "placeholder:text-red-400 ring-red-300 outline-red-500"
            : "outline-primary"
        }
          ${type === "password" ? "pe-8" : null}
          ${icon ? "ps-8" : null}
        `}
        {...register}
      />

      {icon && (
        <i
          className={`${icon} pointer-events-none text-lg absolute left-[8px] top-[31px] sm:top-[37px] md:top-[42px]`}
        ></i>
      )}

      {type === "password" && (
        <button
          tabIndex={100}
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className={`text-lg color-primary flex items-center absolute top-[28px] sm:top-[34px] md:top-[40px] right-1 p-[3px] pb-[1px] fa-solid outline-none ${
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
