import { Navigate, Outlet, useLoaderData } from "react-router-dom";

import { useUser } from "../hooks/useUser";

export default function LoginGuard() {
  const res = useLoaderData();
  useUser({ initValue: res });
  return !res ? <Navigate to={"/login"} replace /> : <Outlet />;
}
