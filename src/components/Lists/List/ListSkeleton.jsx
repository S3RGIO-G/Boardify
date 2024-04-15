import List from "./List";
export default function ListSkeleton({ isOwner = false }) {
  const arr = [55, 65, 85, 70];

  return (
    <List>
      <header className="grid grid-cols-[1fr_max-content] p-2 gap-2">
        <p className="bg-slate-300 w-full h-full rounded-md animate-pulse"></p>
        <span className="bg-slate-300 w-8 h-8 rounded-md animate-pulse"></span>
      </header>

      <ol className="flex flex-col h-full py-0.5 px-2">
        {arr.map((x, i) => {
          const width = x;

          return (
            <li className="pb-2" key={i}>
              <p className="flex h-[36px] shadow-sm shadow-black/25 px-3 py-2 bg-white rounded-lg">
                <span
                  className="h-full bg-slate-300 animate-pulse rounded-sm"
                  style={{ width: `${width}%` }}
                ></span>
              </p>
            </li>
          );
        })}
      </ol>

      {isOwner && (
        <footer className="flex h-fit w-full px-2 pt-2 cursor-auto">
          <span className="flex h-10 w-full py-1.5 px-2 items-center rounded-md gap-2 font-medium text-sm bg-slate-300 animate-pulse"></span>
        </footer>
      )}
    </List>
  );
}
