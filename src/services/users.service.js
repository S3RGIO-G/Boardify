import axios from 'axios';
import { BASE_URL_API } from '../../config';

export async function checkUser() {
  try {
    const user = await verifyAuth();
    return user;
  } catch (err) {
    console.error(err.message);
    return null;
  }
}

export async function login({ email, password }) {
  try {
    const res = await axios.post(BASE_URL_API + '/auth/login', { email, password }, { withCredentials: true });
    return res.data;
  }
  catch (err) {
    throw Error(err.response.data.error)
  }
}

export function logout() {
  return axios.post(BASE_URL_API + '/auth/logout', {}, { withCredentials: true });
}

export async function verifyAuth() {
  try {
    const res = await axios.get(BASE_URL_API + '/auth/validate', { withCredentials: true });
    return res.data;
  } catch (err) {
    throw Error(err.response.data.error);
  }
}

export async function register({ email, password, userName }) {
  try {
    const user = { email, password, userName, photo: "/user.png" };
    const res = await axios.post(`${BASE_URL_API}/auth/register`, user);
    return res.data;
  }
  catch (err) {
    throw Error(err.response.data.error)
  }
}

export async function getUsersByField(field, value) {
  try {
    const res = await axios.get(`${BASE_URL_API}/users?${field}=${value}`);
    return res.data;
  }
  catch (err) {
    throw Error(err.response.data.error)
  }
}

export async function getUsersById(id) {
  try {
    const res = await axios.get(`${BASE_URL_API}/users/${id}`);
    return res.data;
  }
  catch (err) {
    throw Error(err.response.data.error)
  }
}
