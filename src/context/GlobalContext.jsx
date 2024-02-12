import React, { useEffect, useState } from "react";

export const Context = React.createContext();

export function GlobalContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState({});
  const [loadingUser, setLoadingUser] = useState(true);
  const [tasks, setTasks] = useState({});
  const [lists, setLists] = useState([]);

  const loadLanguage = async () => {
    const language = JSON.parse(localStorage.getItem("language"));
    const data = await fetch(`/languages/${language || "en"}.json`);
    const texts = await data.json();
    setLanguage(texts);
  };

  useEffect(() => {
    loadLanguage();
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
