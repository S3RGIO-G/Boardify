import { useEffect, useState } from "react";

import { useLists } from "../../../../../hooks/useLists";
import { useLanguage } from "../../../../../hooks/useLanguage";

export default function ActivityItem({ item, owner }) {
  const { lists } = useLists();
  const [show, setShow] = useState(false);
  const {
    texts: { task: TEXT },
  } = useLanguage();

  useEffect(() => {
    const from = lists?.find((l) => l.id === item?.from);
    const to = lists?.find((l) => l.id === item?.to);

    if (!from || !to) setShow(false);
    else setShow(true);
  }, []);

  const getNameList = (id) => {
    const list = lists?.find((l) => l.id === id);
    return list?.name;
  };

  const getTime = (time) => {
    const date = new Date(time);
    let string = date.toLocaleDateString();
    string += " " + date.toLocaleTimeString().split(":", 2).join(":");
    return string;
  };

  return (
    <div className={`ms-10 py-2 text-[#172b4d] ${show ? "block" : "hidden"}`}>
      <div className={`${item?.from !== item?.to ? "block" : "hidden"}`}>
        <span className="font-bold">{owner + " "}</span>
        {TEXT?.activity.move}
        <span className="font-medium"> {`"${getNameList(item?.from)}"`} </span>
        <i className="fa-solid fa-arrow-right"> </i>{" "}
        <span className="font-medium">{`"${getNameList(item?.to)}"`}</span>
      </div>

      <div className={`${item?.from === item?.to ? "block" : "hidden"}`}>
        <span className="font-bold">{owner + " "}</span>
        {TEXT?.activity.new}
        <span className="font-medium"> {`"${getNameList(item?.from)}"`} </span>
      </div>

      <div>
        <span className="select-none cursor-pointer text-xs hover:underline">
          {getTime(item.time)}
        </span>
      </div>
    </div>
  );
}
