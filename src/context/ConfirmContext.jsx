import React, { useState } from "react";

export const ModalContext = React.createContext();

export function ModalContextProvider({ children }) {
  const [modalConfirm, setModalConfirm] = useState({});

  const obj = { modalConfirm, setModalConfirm };

  return (
    <ModalContext.Provider value={obj}>{children}</ModalContext.Provider>
  );
}
