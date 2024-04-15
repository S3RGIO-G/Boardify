import { Link, Outlet } from "react-router-dom";

import { useUser } from "../../hooks/useUser";

import SwitchLanguage from "../Header/SwitchLanguage";

export default function ContainerNoLogin() {
  useUser({ initLoading: false });

  return (
    <div className="w-full relative min-h-dvh flex flex-col items-center justify-center p-4 bg-gradient">
      <div className="absolute top-6 z-10 flex items-center w-full max-w-[1000px] justify-between px-10">
        <Link to={"/"}>
          <img
            src="logo.png"
            alt="Boardify logo"
            className="w-10 min-h-[54px]"
          />
        </Link>

        <SwitchLanguage />
      </div>

      <Outlet></Outlet>
    </div>
  );
}
