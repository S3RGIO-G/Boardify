import { useEffect, useState } from "react";
import { useLanguage } from "../hooks/useLanguage";

export function SwitchLanguage({ onChange }) {
  const { updateLanguage, texts } = useLanguage();
  const [active, setActive] = useState(false);

  useEffect(() => {
    const lang = JSON.parse(localStorage.getItem("language"));
    if (lang === "en" || !lang) setActive(true);
    else if (lang === "es") setActive(false);
  }, []);

  useEffect(() => {
    if (onChange) onChange();
  }, [texts]);

  const switchLanguage = async () => {
    setActive(!active);
    if (!active) await updateLanguage("en");
    else await updateLanguage("es");
  };

  return (
    <button
      onClick={switchLanguage}
      className={` cursor-pointer relative w-16 h-8 rounded-full transition-all duration-200 border-2 border-white focus:outline outline-4 outline-[rgb(149,90,205)] select-none ${
        active ? "bg-primary" : 'bg-gray-200'
      }`}
    >
      <span
        className={`flex items-center justify-center w-[40px] h-[40px]  absolute rounded-full top-[-6px]  transition-all duration-200 bg-white ${
          active ? " left-1/2" : "left-[-10px]"
        }`}
      >
        <img
          src="/flag_usa.jpg"
          className={`w-[30px] rounded-[3px]  ${active ? "block" : "hidden"}`}
        />

        <img
          src="/flag_spain.jpg"
          className={`w-[30px] rounded-[3px]  ${!active ? "block" : "hidden"}`}
        />
      </span>
    </button>
  );
}
