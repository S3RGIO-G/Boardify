import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";

export function CardBoard({ board, type, user, createBoard, updateBoard }) {
  const [creating, setCreating] = useState(false);
  const ref = useRef(null);
  const nav = useNavigate();
  const {
    texts: { board: TEXT },
  } = useLanguage();

  const onFav = (e) => {
    e.preventDefault();
    updateBoard(board.id, { fav: !board.fav });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const name = e.target["inputNameBoard"].value.trim();
    setCreating(false);
    if (!name) return;
    const id = await createBoard(name, user.id);
    nav(`/boards/${id}`);
  };

  useEffect(() => {
    if (type === "add") {
      document.addEventListener("mousedown", (e) => {
        const { current } = ref;
        if (current && !current.contains(e.target)) setCreating(false);
      });
    }
  }, []);

  return (
    <li className="w-full min-[375px]:w-[calc(50%-4px)] sm:w-[calc(33%-3.75px)] md:w-[calc(25%-6px)] select-none bg-[#955acd] hover:bg-[#804daf] h-full rounded-md">
      {type === "card" && (
        <Link to={`/boards/${board.id}`} className="block h-full w-full p-2">
          <div className="flex flex-col w-full h-24 justify-between font-bold text-white text-base leading-5">
            <div className="block h-5 w-full overflow-hidden text-ellipsis">
              {board.name}
            </div>

            <div className="flex justify-end p-1">
              <button
                onClick={onFav}
                className={` ${
                  board.fav ? "fa-solid text-yellow-300" : "fa-regular"
                } fa-star text-2xl hover:scale-125 transition-all`}
              ></button>
            </div>
          </div>
        </Link>
      )}

      {type === "add" && (
        <div
          className={`flex w-full h-full  rounded-md   ${
            !creating ? "bg-slate-300 hover:bg-slate-400" : "bg-slate-400"
          } `}
        >
          {!creating && (
            <div
              onClick={() => setCreating(true)}
              className="cursor-pointer h-full w-full leading-[96px] text-center font-bold text-nowrap overflow-hidden text-ellipsis p-2"
            >
              <span className="fas fa-plus mr-1 "></span>
              {TEXT?.addBoard.text}
            </div>
          )}

          {creating && (
            <form
              ref={ref}
              onSubmit={onSubmit}
              className="flex flex-col gap-2 py-2 px-2 h-full w-full "
            >
              <input
                placeholder={TEXT?.addBoard.placeholder}
                name="inputNameBoard"
                autoFocus
                type="text"
                maxLength={100}
                defaultValue={board?.name}
                className="flex text-black px-2.5 py-1.5 h-8 w-full focus:outline outline-2 outline-primary rounded-sm"
              />

              <div className="flex w-full gap-2 font-medium text-xs">
                <button
                  type="submit"
                  className="btn-primary p-1.5 px-2 text-white rounded-md"
                >
                  {TEXT?.addBoard.text}
                </button>

                <button
                  onClick={() => setCreating(false)}
                  type="button"
                  className="min-w-8 min-h-8 btn-slate rounded-md"
                >
                  <span className="fa-solid fa-xmark"></span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </li>
  );
}
