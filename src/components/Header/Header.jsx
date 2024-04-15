import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

import ModalHeader from "../Modals/ModalHeader/ModalHeader";

export default function Header({ user, handlerLogout = () => {} }) {
  const [showModal, setShowModal] = useState(false);
  const buttonRef = useRef(null);
  const { idBoard } = useParams();

  useEffect(() => {
    if (showModal) setShowModal(false);
  }, [history.state]);

  return (
    <header
      className={`flex relative justify-between py-2 px-4  border-b-[1px] ${
        idBoard && "bg-black/15 border-b-white/15"
      }`}
    >
      <Link
        to={"/"}
        className="flex h-full text-2xl leading-6 items-center font-bold select-none"
      >
        <img alt="logo" src="/logo.png" className="h-5  mr-[1px]" />
        <span className={idBoard ? "text-white" : "text-black"}>oard</span>
        <span className="text-purple-400">ify</span>
      </Link>

      <button
        ref={buttonRef}
        onClick={() => setShowModal(!showModal)}
        className={`flex relative p-1 items-center gap-2 hover:bg-black/10 rounded-md ${
          idBoard ? "text-slate-100" : ""
        }`}
      >
        <b className="text-lg">@{user?.userName}</b>
        <img
          src={user?.photo}
          alt={user?.userName + " photo"}
          title={user?.userName + " photo"}
          draggable="false"
          className="w-7 h-7 p-0.5 rounded-full bg-slate-100"
        />
      </button>

      <ModalHeader
        user={user}
        show={showModal}
        btnRef={buttonRef}
        hideModal={setShowModal}
        onLogout={handlerLogout}
      />
    </header>
  );
}
