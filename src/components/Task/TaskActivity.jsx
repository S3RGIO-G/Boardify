import { useState } from "react";
import { ActivityItem } from "./ActivityItem.jsx";
import { useLanguage } from "../../hooks/useLanguage.js";

export function TaskActivity({ task, owner }) {
  const [show, setShow] = useState(true);
  const {
    texts: { task: TEXT },
  } = useLanguage();

  return (
    <div className="relative">
      <div className="flex items-center justify-between w-full h-12 ps-10 py-2 mb-2">
        <span className="fa-solid fa-list-ul absolute left-0 text-base w-6 h-6 text-center before:leading-6"></span>

        <h3 className="text-base font-semibold">{TEXT?.activity.title}</h3>

        <button
          onClick={() => setShow(!show)}
          className="bg-slate-200 py-1.5 px-3 rounded-[3px] hover:bg-slate-300 font-medium"
        >
          {!show ? TEXT?.activity.show : TEXT?.activity.hide}
        </button>
      </div>

      <div
        className={`max-h-[150px] sm:max-h-[300px] overflow-auto ${
          show ? "block" : "hidden"
        }`}
        style={{ scrollbarWidth: "thin" }}
      >
        {task?.activity?.map((act) => (
          <ActivityItem key={act.time} item={act} owner={owner} />
        ))}
      </div>

      <p
        className={`ps-10 h-14 leading-[56px] text-center font-medium text-base text-nowrap overflow-hidden text-ellipsis ${
          !show ? "block" : "hidden"
        }`}
      >
        {TEXT?.activity.hidden}
      </p>
    </div>
  );
}
