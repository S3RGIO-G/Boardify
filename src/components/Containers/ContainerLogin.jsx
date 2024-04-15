import { Outlet, useNavigate, useParams } from "react-router-dom";

import { useUser } from "../../hooks/useUser";

import Header from "../Header/Header";
import OwnerContextProvider from "../../context/OwnerContext";

export default function ContainerLogin() {
  const { user, logoutUser } = useUser();
  const { idBoard } = useParams();
  const nav = useNavigate();

  const handlerLogout = async () => {
    try {
      await logoutUser();
      nav("/login");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <OwnerContextProvider>
      <div
        className={`flex flex-col h-dvh ${idBoard ? "bg-primary" : "bg-white"}`}
      >
        <Header user={user} handlerLogout={handlerLogout} />
        <Outlet />
      </div>
    </OwnerContextProvider>
  );
}
