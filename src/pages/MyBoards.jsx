import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import { useUser } from "../hooks/useUser";
import { useBoards } from "../hooks/useBoards";
import { useLanguage } from "../hooks/useLanguage";

import BoardsList from "../components/Boards/BoardsList";
import CardAddBoard from "../components/Boards/Card/CardAddBoard";

export default function MyBoards() {
  const { user } = useUser();
  const { boards, createBoard, updateBoard } = useBoards({ idUser: user?.id });
  const [favourites, setFavourites] = useState(null);
  const { texts: TEXT } = useLanguage();

  useEffect(() => {
    if (boards) {
      const filtered = boards.filter((b) => b.fav);
      filtered.sort((x, y) =>
        x.updated > y.updated ? -1 : x.updated < y.updated ? 1 : 0
      );
      setFavourites(filtered);
    }
  }, [boards]);

  return (
    <main className="py-10 px-4 h-full w-full overflow-y-auto">
      <Helmet title={TEXT.titles?.myBoards} />
      <div className="w-full m-auto max-w-[1200px]">
        <div className="w-full mb-10">
          <h2 className="font-bold text-base sm:text-lg mb-2 text-slate-500">
            <span className="fa-solid fa-heart mr-2 text-red-500"></span>
            {TEXT.board?.favorites}
          </h2>

          <BoardsList boards={favourites} updateBoard={updateBoard} spinner>
            {favourites?.length === 0 && (
              <p className="leading-[150px] w-full text-center select-none font-medium text-lg">
                {TEXT.board?.noFavs}
              </p>
            )}
          </BoardsList>
        </div>

        <div className="w-full ">
          <h2 className="font-bold text-base sm:text-lg mb-2 text-slate-500">
            <span className="fa-solid fa-window-restore mr-2 text-amber-800"></span>
            {TEXT.board?.myBoards}
          </h2>

          <BoardsList boards={boards} updateBoard={updateBoard}>
            <CardAddBoard userId={user?.id} createBoard={createBoard} />
          </BoardsList>
        </div>
      </div>
    </main>
  );
}
