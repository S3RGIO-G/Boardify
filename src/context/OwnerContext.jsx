import React, { useState } from "react";

export const OwnerContext = React.createContext();

export default function OwnerContextProvider({ children }) {
  const [isOwner, setIsOwner] = useState(false);

  const obj = { isOwner, setIsOwner };

  return <OwnerContext.Provider value={obj}>{children}</OwnerContext.Provider>;
}
