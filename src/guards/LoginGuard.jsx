import { Navigate, Outlet, useLoaderData } from "react-router-dom";
import { useUser } from "../hooks/useUser";

export function LoginGuard() {
  const res = useLoaderData();
  useUser({ initUser: res, initLoading: false });
  return !res ? <Navigate to={"/login"} replace /> : <Outlet />;
}
