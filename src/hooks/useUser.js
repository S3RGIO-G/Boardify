import { useContext, useEffect } from "react";
import { Context } from "../context/GlobalContext";
import { login, logout, register, verifyAuth } from "../services/users.service";
import Cookies from "js-cookie";

export function useUser({ load = false, initUser = null, initLoading = null } = {}) {
  const { user, setUser, loadingUser, setLoadingUser } = useContext(Context);

  useEffect(() => {
    if (initUser !== null) setUser(initUser);
    if (initLoading !== null) setLoadingUser(initLoading)
    if (load) loadUser();
  }, [])

  const loadUser = async () => {
    console.log('load');
    setLoadingUser(true);
    const token = Cookies.get("credentials");
    try {
      if (token) {
        const user = await verifyAuth();
        setUser(user);
        return user;
      }
      return null;
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoadingUser(false);
    }
  };

  const loginUser = async ({ email, password }) => {
    try {
      setLoadingUser(true);
      const res = await login({ email, password });
      setLoadingUser(false);
      setUser(res);
      return res;
    }
    catch (err) {
      setLoadingUser(false)
      throw Error(err.message)
    }
  }

  const registerUser = async ({ email, password, userName }) => {
    try {
      setLoadingUser(true);
      const res = await register({ email, password, userName });
      setLoadingUser(false);
      return res;
    }
    catch (err) {
      setLoadingUser(false);
      throw Error(err.message)
    }
  }

  const logoutUser = async () => {
    try {
      setLoadingUser(true);
      const res = await logout();
      setUser(null);
      setLoadingUser(false);
      return res;
    }
    catch (err) {
      setLoadingUser(false);
      throw Error(err.message)
    }
  }

  const updateUser = (data) => {
    setUser(prev => ({ ...prev, ...data }));
  }

  return { user, loadingUser, setLoadingUser, loginUser, registerUser, logoutUser, updateUser, loadUser }
}