import { useUser } from "../hooks/useUser";
import { CardBoard } from "../components/CardBoard";
import { useBoards } from "../hooks/useBoards";
import { useEffect, useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { Spinner } from "../components/Spinner";

export function MyBoards() {
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

  useEffect(() => {
    document.title = "My boards";
  }, []);

  return (
    <main className="py-10 px-4 h-full w-full overflow-y-auto">
      <div className="w-full m-auto sm:w-[90%] max-w-[900px]">
        <div className="w-full mb-10">
          <h2 className="font-bold text-base mb-2 text-slate-500">
            <span className="fa-solid fa-heart mr-2 text-red-500"></span>
            {TEXT.board?.favorites}
          </h2>

          <ul className="flex flex-wrap min-h-[144px] justify-start gap-x-2 gap-y-6 p-4 bg-slate-100 rounded-md">
            {favourites ? (
              <>
                {favourites?.map((b) => (
                  <CardBoard
                    board={b}
                    type="card"
                    key={b.id}
                    updateBoard={updateBoard}
                  />
                ))}
                {!favourites.length && (
                  <p className="leading-[112px] w-full text-center select-none font-medium text-lg">
                    {TEXT.board?.noFavs}
                  </p>
                )}
              </>
            ) : (
              <Spinner className="w-16 h-16 m-auto fill-[#955acd] animate-spin" />
            )}
          </ul>
        </div>

        <div className="w-full ">
          <h2 className="font-bold text-base mb-2 text-slate-500">
            <span className="fa-solid fa-window-restore mr-2 text-amber-800"></span>
            {TEXT.board?.myBoards}
          </h2>

          <ul className="flex flex-wrap min-h-[144px] justify-start gap-x-2 gap-y-6 p-4 bg-slate-100 rounded-md">
            {boards?.map((b) => (
              <CardBoard
                board={b}
                type="card"
                key={b.id}
                updateBoard={updateBoard}
              />
            ))}
            <CardBoard user={user} type="add" createBoard={createBoard} />
          </ul>
        </div>
      </div>
    </main>
  );
}
