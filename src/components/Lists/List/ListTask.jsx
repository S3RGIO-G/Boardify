import { Draggable, Droppable } from "@hello-pangea/dnd";

import { useTasks } from "../../../hooks/useTasks";
import { useOwner } from "../../../hooks/useOwner";

import HeaderList from "./HeaderList";
import AddTask from "../../Tasks/AddTask";
import TaskItem from "../../Tasks/Task/TaskItem";
import ListSkeleton from "./ListSkeleton";
import List from "./List";

export default function ListTask({ list, index }) {
  const { tasks } = useTasks();
  const { isOwner } = useOwner();

  const emptyList = tasks?.[list.id]?.length === 0;
  const styleOL = {
    display: emptyList && !isOwner && "none",
    scrollbarColor: "#091E4224 #091e4224",
    scrollbarWidth: "thin",
  };

  if (!tasks?.[list.id]) return <ListSkeleton isOwner={isOwner} />;
  else
    return (
      <Draggable draggableId={list.id} index={index} isDragDisabled={!isOwner}>
        {(provided) => (
          <List
            ref={provided.innerRef}
            dataId={list.id}
            draggableProps={provided.draggableProps}
          >
            <HeaderList
              list={list}
              isOwner={isOwner}
              dragHandleProps={provided.dragHandleProps}
            />

            <Droppable
              type="card"
              droppableId={list.id}
              isDropDisabled={!isOwner}
            >
              {(provided) => (
                <ol
                  ref={provided.innerRef}
                  data-id={list.id}
                  style={styleOL}
                  {...provided.droppableProps}
                  className="relative flex flex-col h-full py-0.5 px-2 min-h-[5px] overflow-x-hidden"
                >
                  {tasks?.[list.id]?.map((task, i) => (
                    <TaskItem task={task} key={task.id} index={i} />
                  ))}

                  {provided.placeholder}
                </ol>
              )}
            </Droppable>

            {emptyList && !isOwner && (
              <img
                src="/icons/empty-list.png"
                alt="Icon empty list"
                draggable="false"
                className="h-10 mx-auto mt-0.5 mb-1.5"
              />
            )}

            {isOwner && <AddTask idList={list.id} />}
          </List>
        )}
      </Draggable>
    );
}
