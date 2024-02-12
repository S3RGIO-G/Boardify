import { useContext } from "react";
import { Context } from "../context/GlobalContext";

export function useLanguage() {
  const { language, setLanguage } = useContext(Context);

  const updateLanguage = async (name) => {
    const data = await fetch(`/languages/${name}.json`);
    const texts = await data.json();
    setLanguage(texts);
    localStorage.setItem("language", JSON.stringify(name));
  }

  return { texts: language, updateLanguage }
}