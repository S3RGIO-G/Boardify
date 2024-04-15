import Spinner from "../Spinner";
import CardBoard from "./Card/CardBoard";

export default function BoardsList({
  children,
  boards,
  className = "",
  spinner = false,
  updateBoard,
}) {
  return (
    <ul
      className={`flex min-h-[200px] flex-wrap gap-x-2 gap-y-6 p-[25px] bg-slate-100 rounded-md ${className}`}
    >
      {boards?.map((b) => (
        <CardBoard board={b} key={b.id} updateBoard={updateBoard} />
      ))}

      {spinner && (
        <Spinner
          show={!boards}
          className="w-16 h-16 m-auto fill-[#955acd] animate-spin"
        />
      )}

      {children}
    </ul>
  );
}
