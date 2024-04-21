import axios from 'axios';
import { BASE_URL_API } from '../../config';

export async function getListsByField(field, value) {
  try {
    const res = await axios.get(`${BASE_URL_API}/lists?${field}=${value}`);
    return res.data;
  }
  catch (err) {
    throw Error(err.response.data.error)
  }
}

export async function addList(list) {
  try {
    const res = await axios.post(`${BASE_URL_API}/lists`, list, { withCredentials: true });
    return res.data;
  }
  catch (err) {
    throw Error(err.response.data.error)
  }
}

export async function updateListById(id, data) {
  try {
    const res = await axios.put(`${BASE_URL_API}/lists/${id}`, data, { withCredentials: true });
    return res.data;
  }
  catch (err) {
    throw Error(err.response.data.error)
  }
}

export async function deleteListsByField(field, value) {
  try {
    const res = await axios.delete(`${BASE_URL_API}/lists?${field}=${value}`, { withCredentials: true });
    return res.data;
  } catch (err) {
    throw Error(err.response.data.error)
  }
}

export async function deleteListById(id) {
  try {
    const res = await axios.delete(`${BASE_URL_API}/lists/${id}`, { withCredentials: true });
    return res.data;
  }
  catch (err) {
    throw Error(err.response.data.error)
  }
}