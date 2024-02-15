import { Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { LoginGuard } from "./guards/LoginGuard";
import { Register } from "./pages/Register";
import { ContainerLogin } from "./components/ContainerLogin";
import { Board } from "./pages/Board";
import { MyBoards } from "./pages/MyBoards";
import { Task } from "./pages/Task";
import { ContainerNoLogin } from "./components/ContainerNoLogin";
import { checkUser } from "./services/users.service";
import NotFound from "./components/NotFound";

export default function App() {
  return (
    <>
      <Route path="/home" element={<Navigate to={"/"} replace />} />

      <Route element={<ContainerNoLogin />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<NotFound />} />
      </Route>

      <Route loader={checkUser} element={<LoginGuard />}>
        <Route element={<ContainerLogin />}>
          <Route path="boards" element={<MyBoards />} />
          <Route path="boards/:idBoard" element={<Board />}>
            <Route path="card" element={<Navigate to={"../"} replace />} />
            <Route path="card/:idTask" element={<Task />} />
          </Route>
        </Route>
      </Route>
    </>
  );
}
