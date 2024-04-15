import { forwardRef } from "react";

function ListContainer(
  { children, dataId = "dataId", draggableProps = {} },
  ref
) {
  return (
    <li
      ref={ref}
      data-id={dataId}
      {...draggableProps}
      className="flex h-max min-w-[284px] max-w-[284px] px-1.5 max-h-full select-none"
    >
      <article className="flex flex-col pb-2 w-full rounded-xl bg-slate-100 border-slate-300 border">
        {children}
      </article>
    </li>
  );
}

const List = forwardRef(ListContainer);
export default List;
