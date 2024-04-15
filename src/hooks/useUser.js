import { useContext, useEffect } from "react";
import { Context } from "../context/GlobalContext";
import { getUsersByField, login, logout, register } from "../services/users.service";

export function useUser({ initValue } = {}) {
  const { user, setUser, loadingUser, setLoadingUser } = useContext(Context);

  useEffect(() => {
    if (initValue !== undefined) setUser(initValue);
  }, [])

  const loginUser = async ({ email, password }) => {
    try {
      setLoadingUser(true);
      const res = await login({ email, password });
      setUser(res);
      return res;
    }
    catch (err) {
      throw Error(err.message)
    }
    finally { setLoadingUser(false); }
  }

  const registerUser = async ({ email, password, userName }) => {
    try {
      setLoadingUser(true);
      const res = await register({ email, password, userName });
      return res;
    }
    catch (err) {
      throw Error(err.message)
    }
    finally { setLoadingUser(false); }
  }

  const logoutUser = async () => {
    try {
      setLoadingUser(true);
      const res = await logout();
      setUser(null);
      return res;
    }
    catch (err) {
      throw Error(err.message)
    }
    finally { setLoadingUser(false); }
  }

  const checkAvailabilityByField = async (fieldName, value) => {
    try {
      setLoadingUser(true)
      const res = await getUsersByField(fieldName, value);
      return !res.length ? true : false;
    } catch (err) {
      return false
    }
    finally { setLoadingUser(false) }
  }

  return { user, loadingUser, loginUser, registerUser, logoutUser, checkAvailabilityByField }
}