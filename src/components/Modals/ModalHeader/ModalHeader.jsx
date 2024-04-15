import { useEffect, useRef } from "react";
import SwitchLanguage from "../../Header/SwitchLanguage";
import { useLanguage } from "../../../hooks/useLanguage";

export default function ModalHeader({
  user,
  btnRef,
  show,
  hideModal = () => {},
  onLogout = () => {},
}) {
  const modalRef = useRef(null);
  const { texts: TEXT } = useLanguage();

  const handleClickOutside = (event) => {
    if (btnRef.current && btnRef.current.contains(event.target)) return;
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      hideModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={modalRef}
      className={`z-10 mr-4 text-[#44546f] rounded-lg bg-slate-100 shadow-2xl absolute top-full right-0 transition-all duration-300 overflow-hidden h-0 p-0 ${
        show ? "h-[173px]" : ""
      }`}
    >
      <div className="flex items-center gap-2 px-5 pt-3 pb-2">
        <img
          src={user?.photo}
          alt={user?.userName + " photo"}
          title={user?.userName + " photo"}
          draggable="false"
          className="w-12 h-12 select-none"
        />
        <div className="flex flex-col w-[150px]">
          <span className="font-bold overflow-ellipsis overflow-hidden">
            @{user?.userName}
          </span>
          <i className="overflow-ellipsis overflow-hidden text-[14px] font-medium">
            {user?.email}
          </i>
        </div>
      </div>

      <SwitchLanguage
        langFrom="ES"
        langTo="EN"
        className="pt-1 pb-3 font-bold text-xl justify-center select-none"
      />

      <hr className="mx-2" />

      <button
        onClick={onLogout}
        className="my-2 relative w-full px-5 py-2 text-start font-medium hover:bg-slate-100 hover:text-red-500"
      >
        {TEXT.board?.logout}
        <span className="fa-solid fa-right-from-bracket absolute right-0 mr-5 before:leading-6"></span>
      </button>
    </div>
  );
}
