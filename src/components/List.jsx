import { useEffect, useState } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { useTasks } from "../hooks/useTasks";
import { TaskItem } from "./TaskItem";
import { AddTask } from "./AddTask";
import { useLists } from "../hooks/useLists";
import { ListOptions } from "./ListOptions";
import { FormTextArea } from "./FormTextArea";
import { useOwner } from "../hooks/useOwner";
import { Spinner } from "./Spinner";
import { useLanguage } from "../hooks/useLanguage";

export function List({ list, index }) {
  const { updateList } = useLists();
  const { tasks, loadTaskOfList } = useTasks();
  const [editing, setEditing] = useState(false);
  const [show, setShow] = useState(false);
  const { isOwner } = useOwner();
  const {
    texts: { board: TEXT },
  } = useLanguage();

  useEffect(() => {
    loadTaskOfList(list);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const name = e.target[list.id].value.trim();
    if (!name || name === list.name) setEditing(false);
    else {
      setEditing(false);
      updateList(list.id, { name });
    }
  };

  return (
    <Draggable draggableId={list.id} index={index} isDragDisabled={!isOwner}>
      {(provided) => (
        <li
          data-id={list.id}
          className="flex px-[6px] h-fit min-w-[284px] max-h-full w-[284px] select-none"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className="flex flex-col pb-2 w-full rounded-xl bg-slate-100">
            <div
              className="flex relative justify-between items-start p-2"
              {...provided.dragHandleProps}
            >
              <div className="w-[220px] text-sm font-medium">
                {!editing && (
                  <h2
                    onClick={() => isOwner && setEditing(true)}
                    className={`overflow-hidden break-words flex-wrap ps-3 py-1.5 pe-2 font-medium ${
                      isOwner && "cursor-pointer"
                    }
                  `}
                  >
                    {list.name}
                  </h2>
                )}

                <FormTextArea
                  show={editing}
                  autoSelect={true}
                  onSubmit={onSubmit}
                  changeShow={(data) => setEditing(data)}
                  defaultValue={list.name}
                  nameText={list.id}
                  maxLength={512}
                  classText="h-8 ps-3 py-1.5 pe-2 outline-primary overflow-y-hidden"
                />
              </div>

              <button
                data-id={`options-${list?.id}`}
                onClick={() => isOwner && setShow(!show)}
                className={`fa-solid fa-ellipsis rounded-lg h-8 w-8 before:leading-8 ${
                  isOwner ? "hover:bg-black/10" : "cursor-default"
                }`}
              ></button>

              <ListOptions
                show={show}
                changeShow={(bool) => setShow(bool)}
                onEdit={() => {
                  setEditing(true);
                  setShow(false);
                }}
                list={list}
              />
            </div>

            {tasks[list.id] && (tasks[list.id].length || isOwner) ? (
              <Droppable
                droppableId={list.id}
                type="card"
                isDropDisabled={!isOwner}
              >
                {(provided) => (
                  <ol
                    data-id={list.id}
                    ref={provided.innerRef}
                    className="relative flex flex-col px-1 pt-0.5 mx-1 min-h-[5px] max-h-full overflow-x-hidden overflow-y-auto"
                    style={{
                      scrollbarColor: "#091E4224 #091e4224",
                      scrollbarWidth: "thin",
                    }}
                    {...provided.droppableProps}
                  >
                    {tasks[list.id]?.map((task, i) => (
                      <TaskItem task={task} key={task.id} index={i} />
                    ))}
                    {provided.placeholder}
                  </ol>
                )}
              </Droppable>
            ) : tasks[list.id] && !tasks[list.id].length ? (
              <div className="text-slate-500 mx-auto text-center mb-2 font-medium">
                <span className="fa-regular fa-folder-open text-xl"></span>
                <p>{TEXT?.noTasks}</p>
              </div>
            ) : (
              <Spinner className="m-auto mb-4 h-10 w-10 fill-slate-300" />
            )}

            {isOwner && <AddTask idList={list.id} />}
          </div>
        </li>
      )}
    </Draggable>
  );
}
