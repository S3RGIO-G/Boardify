import { Link, Outlet } from "react-router-dom";
import { SwitchLanguage } from "./SwitchLanguage";
import { useUser } from "../hooks/useUser";

export function ContainerNoLogin() {
  useUser({ initLoading: false });

  return (
    <div className="w-full relative h-dvh flex flex-col items-center justify-center p-4 bg-[url('/background.jpg')] bg-cover bg-center">
      <div className="absolute top-6  z-10 flex items-center w-full max-w-[1000px] justify-between px-10">
        <Link to={"/"}>
          <img src="logo.png" alt="logo" className="w-10" />
        </Link>

        <div className=" right-6">
          <SwitchLanguage />
        </div>
      </div>

      <Outlet></Outlet>
    </div>
  );
}
