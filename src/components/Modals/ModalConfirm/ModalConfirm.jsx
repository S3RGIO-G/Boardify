import { useEffect } from "react";

import { useLanguage } from "../../../hooks/useLanguage";
import { useModalConfirm } from "../../../hooks/useModalConfirm";

export default function ModalConfirm() {
  const {
    texts: { modals: TEXT },
  } = useLanguage();
  const { modalConfirm, hideConfirm } = useModalConfirm({ initialValue: true });

  const bgClick = (e) => {
    if (e.target.dataset.id === "bg-modal") modalConfirm.onCancel(e);
  };

  useEffect(() => {
    if (modalConfirm?.show) hideConfirm();
  }, [history.state]);

  const classBtn = "py-2 px-4 rounded-lg";

  if (modalConfirm?.show)
    return (
      <div
        onClick={bgClick}
        data-id="bg-modal"
        className="backdrop-blur-[2px] z-50 flex h-full w-full top-0 left-0 absolute bg-black/50 px-4"
      >
        <div className="m-auto w-full max-w-[300px] bg-slate-200 border-2 border-slate-500 p-5 rounded-md select-none font-bold animate-[modalScale_0.2s_forwards]">
          <h2 className="text-2xl mb-4 text-black text-center">
            {modalConfirm?.title}
          </h2>

          <div className="grid min-[400px]:grid-cols-2 gap-2 text-[#f1eeee]">
            <button
              className={`${classBtn} btn-success`}
              onClick={modalConfirm.onSuccess}
            >
              {TEXT?.btns.accept}
            </button>
            <button
              className={`${classBtn} btn-danger`}
              onClick={modalConfirm.onCancel}
            >
              {TEXT?.btns.cancel}
            </button>
          </div>
        </div>
      </div>
    );
}
