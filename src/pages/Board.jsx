import { Helmet } from "react-helmet";
import { DragDropContext } from "@hello-pangea/dnd";
import { Outlet, useParams } from "react-router-dom";

import { useTasks } from "../hooks/useTasks";
import { useLists } from "../hooks/useLists";
import { useBoards } from "../hooks/useBoards";
import { useOwner } from "../hooks/useOwner";
import { useLanguage } from "../hooks/useLanguage";

import Spinner from "../components/Spinner";
import SubHeader from "../components/Header/SubHeader";
import ContainerLists from "../components/Lists/ContainerLists";
import ModalConfirm from "../components/Modals/ModalConfirm/ModalConfirm";

import ModalContextProvider from "../context/ConfirmContext";

export default function Board() {
  const { switchTasks } = useTasks();
  const { texts: TEXT } = useLanguage();
  const { idBoard, idTask } = useParams();
  const { board, updateBoard, deleteBoard } = useBoards({ idBoard });
  const { lists, switchLists } = useLists({ idBoard });
  const { isOwner } = useOwner({ initLoading: true, board });

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

      <Helmet
        title={idBoard && idTask ? TEXT.titles?.card : TEXT.titles?.board}
      />

      <main className="overflow-hidden pt-3 pb-2 w-full h-full bg-white/5 relative">
        <DragDropContext onDragEnd={onDragEnd}>
          {board && <ContainerLists lists={lists} isOwner={isOwner} />}

          <Spinner
            show={!board}
            className="w-28 h-28 mx-auto mt-20 fill-purple-400 animate-spin"
          />
        </DragDropContext>
      </main>
      <Outlet />
      <ModalConfirm />
    </ModalContextProvider>
  );
}
