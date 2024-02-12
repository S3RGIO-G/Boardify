import { useEffect, useRef, useState } from "react";
import { SwitchLanguage } from "./SwitchLanguage";
import { Link, useParams } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";

export function Header({ user, handlerLogout }) {
  const ref = useRef(null);
  const buttonRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const { idBoard } = useParams();
  const { texts: TEXT } = useLanguage();

  const handleClickOutside = (event) => {
    if (buttonRef.current && buttonRef.current.contains(event.target)) return;
    if (ref.current && !ref.current.contains(event.target)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (showModal) setShowModal(false);
  }, [history.state]);

  return (
    <header
      className={`flex h-[48px] relative justify-between py-2 px-4  border-b-[1px] ${
        idBoard && "bg-black/15 border-b-white/15"
      }`}
    >
      <Link
        to={"/"}
        className="flex h-full text-[24px] leading-6 items-center font-bold select-none"
      >
        <img alt="logo" src="/logo.png" className="h-[24px]  mr-0.5" />
        <span className={idBoard ? "text-white" : "text-black"}>oard</span>
        <span
          className={idBoard ? "text-[#c187ff]" : "text-purple-500"}
        >
          ify
        </span>
      </Link>

      <button
        ref={buttonRef}
        onClick={() => setShowModal(!showModal)}
        className={`flex p-1.5 relative items-center gap-2 ${
          idBoard && "text-slate-100"
        }`}
      >
        <b className="text-lg">@{user?.userName}</b>
        <img
          src={user?.photo}
          alt="photo_user"
          className="w-8 h-8 p-0.5 object-cover rounded-full bg-primary"
        />
      </button>

      <ul
        ref={ref}
        className={`z-10 mr-4 text-[#44546f] rounded-lg bg-slate-100 shadow-xl absolute top-full right-0 transition-all duration-300 overflow-hidden ${
          showModal ? "h-[177px] py-2" : "h-0 p-0"
        }`}
      >
        <li className="flex items-center gap-2 px-5 py-2">
          <img
            className="w-12 h-12 p-0.5 rounded-full select-none bg-primary"
            src={user?.photo}
            alt="photo_user"
          />
          <div className="flex flex-col w-[150px]">
            <span className="font-bold">@{user?.userName}</span>
            <i className="overflow-ellipsis overflow-hidden text-[14px] font-medium">
              {user?.email}
            </i>
          </div>
        </li>
        <li className="flex pt-1 pb-3 font-bold text-xl gap-4 justify-center items-center select-none">
          ES
          <SwitchLanguage></SwitchLanguage>
          EN
        </li>
        <hr className="mx-2" />
        <li className="mt-2">
          <button
            onClick={handlerLogout}
            className="relative w-full px-5 py-2 text-start font-medium hover:bg-slate-100 hover:text-red-500"
          >
            {TEXT.board?.logout}
            <span className="fa-solid fa-right-from-bracket absolute right-0 mr-5 before:leading-6"></span>
          </button>
        </li>
      </ul>
    </header>
  );
}
