import { forwardRef } from "react";

function FormContainer(
  {
    children,
    className = "",
    classButtons = "",
    btnSubmit = "",
    btnCancel = "",
    btnCancelIcon = false,
    buttons = false,
    onSubmit = () => {},
    onCancel = () => {},
  },
  ref
) {
  const center = btnCancelIcon ? "flex items-center justify-center" : "";
  const shadow = "shadow-sm shadow-black/25";

  const submitForm = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form ref={ref} onSubmit={submitForm} className={className}>
      {children}

      {buttons && (
        <div className={`flex ${classButtons}`}>
          <button
            type="submit"
            className={`btn-primary rounded-md px-3 py-1.5 text-white ${shadow}`}
          >
            {btnSubmit}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className={`btn-white rounded-md px-3 py-1.5 ${shadow} ${center}`}
          >
            {btnCancel}

            {btnCancelIcon && (
              <i className="fa-solid fa-close text-lg h-[16px] pointer-events-none"></i>
            )}
          </button>
        </div>
      )}
    </form>
  );
}

const Form = forwardRef(FormContainer);
export default Form;
