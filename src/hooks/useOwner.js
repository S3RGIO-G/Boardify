import { useContext, useEffect } from "react"
import { OwnerContext } from "../context/OwnerContext"
import { useUser } from "./useUser";

export function useOwner({ load = false, board } = {}) {
  const { isOwner, setIsOwner } = useContext(OwnerContext);
  const { user } = useUser();

  useEffect(() => {
    if (load && board && user) {
      if (board?.idUser === user?.id) setIsOwner(true);
      else setIsOwner(false);
    }
  }, [user, board]);

  return { isOwner }
}