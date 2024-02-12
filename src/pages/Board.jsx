import { List } from "../components/List";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useTasks } from "../hooks/useTasks";
import { useLists } from "../hooks/useLists";
import { AddList } from "../components/AddList";
import { Outlet, useParams } from "react-router-dom";
import { SubHeader } from "../components/SubHeader";
import { useBoards } from "../hooks/useBoards";
import { useOwner } from "../hooks/useOwner";
import { useEffect } from "react";
import { ModalContextProvider } from "../context/ConfirmContext";
import { FullModalConfirm } from "../components/FullModalConfirm";
import { Spinner } from "../components/Spinner";
import { useLanguage } from "../hooks/useLanguage";

export function Board() {
  const { idBoard } = useParams();
  const { lists, switchLists } = useLists({ idBoard });
  const { board, updateBoard, deleteBoard } = useBoards({ idBoard });
  const { isOwner } = useOwner({ load: true, board });
  const { switchTasks } = useTasks();
  const {
    texts: { board: TEXT },
  } = useLanguage();

  useEffect(() => {
    document.title = "Board";
  }, []);

  const onDragEnd = (event) => {
    const { source: from, destination: to, type } = event;
    const { droppableId: fromList, index: fromIndex } = from;
    const { droppableId: toList, index: toIndex } = to || {};

    if (!to || (fromList === toList && fromIndex === toIndex)) return;
    if (type === "card") switchTasks({ fromList, toList, fromIndex, toIndex });
    else if (type === "list") switchLists(from.index, to.index);
  };

  return (
    <ModalContextProvider>
      <SubHeader
        board={board}
        updateBoard={updateBoard}
        deleteBoard={deleteBoard}
      />

      {board ? (
        <main className="overflow-hidden pt-3 pb-2 w-full h-full bg-white/5 relative">
          {lists.length || isOwner ? (
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable
                isDropDisabled={!isOwner}
                droppableId="lists"
                type="list"
                direction="horizontal"
              >
                {(provided) => (
                  <ol
                    ref={provided.innerRef}
                    className="w-full h-full flex overflow-y-hidden overflow-x-auto px-1.5 pb-3"
                    style={{
                      scrollbarColor: "#fff6 #00000026",
                    }}
                    {...provided.droppableProps}
                  >
                    {lists.map((list, i) => (
                      <List
                        lists={lists}
                        list={list}
                        key={list.id}
                        index={i}
                        disable={isOwner}
                      />
                    ))}
                    {provided.placeholder}

                    {isOwner && <AddList />}
                  </ol>
                )}
              </Droppable>
            </DragDropContext>
          ) : (
            <div className="text-3xl sm:text-4xl text-center font-medium text-slate-100 m-auto mt-20">
              <span className="fa-regular fa-folder-open text-7xl mb-2"></span>
              <p>{TEXT?.noLists}</p>
            </div>
          )}
        </main>
      ) : (
        <Spinner className="w-28 h-28 mx-auto mt-20 fill-purple-400 animate-spin" />
      )}
      <Outlet />
      <FullModalConfirm />
    </ModalContextProvider>
  );
}
