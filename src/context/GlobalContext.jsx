import React, { useEffect, useState } from "react";
import EN from "../assets/languages/en.json";
import ES from "../assets/languages/es.json";

export const Context = React.createContext();

export default function GlobalContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState(EN);
  const [loadingUser, setLoadingUser] = useState(false);
  const [tasks, setTasks] = useState(null);
  const [lists, setLists] = useState(null);

  useEffect(() => {
    const lang = localStorage.getItem("lang");

    if (!lang) localStorage.setItem("lang", "en");
    if (lang === "en" || !lang) setLanguage(EN);
    else setLanguage(ES);
  }, []);

  const obj = {
    user,
    setUser,
    loadingUser,
    setLoadingUser,
    lists,
    setLists,
    tasks,
    setTasks,
    language,
    setLanguage,
  };

  return <Context.Provider value={obj}>{children}</Context.Provider>;
}
