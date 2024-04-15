import { useContext, useEffect } from "react"
import { OwnerContext } from "../context/OwnerContext"
import { useUser } from "./useUser";

export function useOwner({ initLoading = false, board } = {}) {
  const { isOwner, setIsOwner } = useContext(OwnerContext);
  const { user } = useUser();

  useEffect(() => {
    if (!initLoading) return;
    (board?.idUser === user?.id) ? setIsOwner(true) : setIsOwner(false);
  }, [user, board]);

  return { isOwner }
}