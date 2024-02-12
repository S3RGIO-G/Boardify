import { useRef } from "react";
import { TextArea } from "./TextArea";

export function FormTextArea({
  show,
  changeShow,
  onSubmit,
  buttons,
  btnText,
  classForm,
  classText,
  nameText,
  maxLength,
  defaultValue,
  autoSelect,
  placeholder,
  submitEnter,
}) {
  const formRef = useRef(null);

  const clickOutside = (event) => {
    const { current } = formRef;
    if (current && !current.contains(event.target)) changeShow(false);
  };

  return (
    show && (
      <form
        ref={formRef}
        onSubmit={onSubmit}
        className={`flex w-full ${classForm ? classForm : ""}`}
      >
        <TextArea
          name={nameText}
          clickOutside={clickOutside}
          maxLength={maxLength || 400}
          autoResize={true}
          defaultValue={defaultValue}
          placeholder={placeholder}
          autoSelect={autoSelect}
          submitEnter={submitEnter}
          className={`w-full rounded-lg placeholder:text-slate-600 ${
            classText || ""
          }`}
        />

        {buttons && (
          <div className="flex mt-2 gap-1">
            <button
              type="submit"
              className="rounded-[3px] px-3 py-1.5 btn-primary text-white text-sm font-medium "
            >
              {btnText}
            </button>
            <button
              type="button"
              onClick={() => changeShow(false)}
              className="flex items-center p-1.5 btn-slate rounded-[3px]"
            >
              <i className="fas fa-solid fa-close text-xl w-[18px] h-[18px] pointer-events-none"></i>
            </button>
          </div>
        )}
      </form>
    )
  );
}
