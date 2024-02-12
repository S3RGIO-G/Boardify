import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTasksById } from "../services/task.service.js";
import { TaskHeader } from "../components/Task/TaskHeader.jsx";
import { TaskDescription } from "../components/Task/TaskDescription.jsx";
import { TaskActivity } from "../components/Task/TaskActivity.jsx";
import { TaskActions } from "../components/Task/TaskActions.jsx";
import { useOwner } from "../hooks/useOwner.js";
import { getUsersById } from "../services/users.service.js";
import { Spinner } from "../components/Spinner.jsx";

export function Task() {
  const { idTask } = useParams();
  const [task, setTask] = useState(null);
  const [taskOwner, setTaskOwner] = useState("");
  const { isOwner } = useOwner();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Card";
    loadTask();
    return () => {
      document.title = "Board";
    };
  }, []);

  const loadTask = async () => {
    try {
      const res = await getTasksById(idTask);
      const owner = await getUsersById(res.idUser);
      setTask(res);
      setTaskOwner(owner.userName);
    } catch (err) {
      console.error(err.message);
      navigate("../../", { relative: "path", replace: true });
    }
  };

  const clickOut = (e) => {
    if (e.target.dataset.id === "modal-task")
      navigate("../../", { relative: "path" });
  };

  return (
    <div
      data-id="modal-task"
      className="top-0 z-10 fixed h-full w-full flex py-10 bg-black/50 overflow-auto"
      onClick={clickOut}
    >
      {task ? (
        <div className="w-[95%] sm:w-4/5 max-w-[768px] relative m-auto self-center bg-slate-100 rounded-xl text-sm shadow-lg">
          <TaskHeader
            task={task}
            onClose={() => navigate("../../", { relative: "path" })}
            updateTaskState={(e) => setTask(e)}
          />

          <div className="flex flex-col sm:flex-row px-4 pb-5 ">
            <div className="w-full pe-2 ">
              <TaskDescription
                task={task}
                updateTaskState={(e) => setTask(e)}
              />
              <TaskActivity owner={taskOwner} task={task} />
            </div>
            <hr className="mt-2" />
            {isOwner && (
              <TaskActions task={task} updateTaskState={(e) => setTask(e)} />
            )}
          </div>
        </div>
      ) : (
        <Spinner className="h-20 w-20 m-auto self-center fill-purple-400 animate-spin" />
      )}
    </div>
  );
}
