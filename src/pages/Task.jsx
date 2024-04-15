import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getTasksById } from "../services/task.service.js";
import { getUsersById } from "../services/users.service.js";

import { useOwner } from "../hooks/useOwner.js";

import TaskHeader from "../components/Tasks/Task/Sections/TaskHeader.jsx";
import TaskActions from "../components/Tasks/Task/Sections/TaskActions.jsx";
import TaskDescription from "../components/Tasks/Task/Sections/TaskDescription.jsx";
import TaskActivity from "../components/Tasks/Task/Sections/TaskActivity/TaskActivity.jsx";
import Spinner from "../components/Spinner.jsx";

export default function Task() {
  const { idTask } = useParams();
  const [task, setTask] = useState(null);
  const [taskOwner, setTaskOwner] = useState("");
  const { isOwner } = useOwner();
  const navigate = useNavigate();

  useEffect(() => {
    loadTask();
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
      className="top-0 z-10 backdrop-blur-[2px] fixed h-full w-full flex py-10 bg-black/50 overflow-y-auto"
      onClick={clickOut}
    >
      {task && (
        <div className="w-[95%] sm:w-4/5 max-w-[768px] relative m-auto self-center bg-slate-100 rounded-xl text-sm shadow-lg animate-[modalScale_0.2s_forwards]">
          <TaskHeader
            task={task}
            onClose={() => navigate("../../", { relative: "path" })}
            updateTaskState={(e) => setTask(e)}
          />

          <div className="flex flex-col sm:flex-row px-4 pb-5">
            <div
              className={`w-full pe-2 ${
                isOwner ? "sm:w-[calc(100%-188px)]" : ""
              }`}
            >
              <TaskDescription
                task={task}
                updateTaskState={(e) => setTask(e)}
              />
              <TaskActivity owner={taskOwner} task={task} />
            </div>

            <hr className="mt-4" />

            {isOwner && (
              <TaskActions task={task} updateTaskState={(e) => setTask(e)} />
            )}
          </div>
        </div>
      )}

      <Spinner
        show={!task}
        className="h-20 w-20 m-auto self-center fill-purple-400 animate-spin"
      />
    </div>
  );
}
