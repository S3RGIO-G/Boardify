import { useContext } from "react";
import { Context } from "../context/GlobalContext";
import EN from '../assets/languages/en.json';
import ES from '../assets/languages/es.json';

export function useLanguage() {
  const { language, setLanguage } = useContext(Context);

  const updateLanguage = async (name) => {
    switch (name) {
      case "en": setLanguage(EN); break;
      case "es": setLanguage(ES); break;
      default: setLanguage(EN);
    }
    localStorage.setItem("lang", name);
  }

  return { texts: language, updateLanguage }
}