import { Droppable } from "@hello-pangea/dnd";

import { useLanguage } from "../../hooks/useLanguage";

import ListTask from "./List/ListTask";
import AddList from "./AddList";

export default function ContainerLists({ lists, isOwner }) {
  const { texts: TEXT } = useLanguage();
  const styleScrollBar = { scrollbarColor: "#fff6 #00000026" };

  if (!isOwner && lists?.length === 0)
    return (
      <div className="w-max mx-auto mt-20">
        <img
          src="/empty-board.png"
          alt="Empty board icon"
          title="Empty board icon"
          draggable="false"
          className="mx-auto"
        />
        <p className="text-3xl sm:text-4xl text-center font-medium text-slate-100">
          {TEXT.board?.noLists}
        </p>
      </div>
    );
  else
    return (
      <Droppable
        type="list"
        droppableId="lists"
        direction="horizontal"
        isDropDisabled={!isOwner}
      >
        {(provided) => (
          <ol
            ref={provided.innerRef}
            className="w-full h-full flex overflow-y-hidden overflow-x-auto px-1.5 pb-3"
            style={styleScrollBar}
            {...provided.droppableProps}
          >
            {lists?.map((list, i) => (
              <ListTask list={list} index={i} key={list.id} />
            ))}

            {provided.placeholder}

            {isOwner && <AddList />}
          </ol>
        )}
      </Droppable>
    );
}
