import { useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { useModalConfirm } from "../hooks/useModalConfirm";

export function FullModalConfirm() {
  const {
    texts: { modals: TEXT },
  } = useLanguage();
  const { modalConfirm, hideModal } = useModalConfirm({ initialValue: true });
  const bgClick = (e) => {
    if (e.target.dataset.id === "bg-modal") modalConfirm.onCancel(e);
  };

  useEffect(() => {
    if (modalConfirm?.show) hideModal();
  }, [history.state]);

  const classBtn = "text-white font-bold py-2 px-4 rounded-lg w-full";

  return (
    modalConfirm.show && (
      <div
        onClick={bgClick}
        data-id="bg-modal"
        className="flex h-full w-full z-50 top-0 left-0 absolute bg-black/50 px-4"
      >
        <div className="m-auto w-full max-w-[300px] bg-slate-200 p-5 rounded-md  select-none">
          <h2 className="text-2xl mb-4 text-black font-medium text-center">
            {modalConfirm?.title}
          </h2>
          <div className="flex flex-col min-[375px]:flex-row w-full gap-2 justify-between">
            <button
              className={`${classBtn} bg-green-500 hover:bg-green-600 border-[2px] border-green-600`}
              onClick={modalConfirm.onSuccess}
            >
              {TEXT?.btns.accept}
            </button>
            <button
              className={`${classBtn} bg-red-500 hover:bg-red-600 border-[2px] border-red-600`}
              onClick={modalConfirm.onCancel}
            >
              {TEXT?.btns.cancel}
            </button>
          </div>
        </div>
      </div>
    )
  );
}
