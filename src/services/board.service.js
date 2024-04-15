import axios from 'axios';
import { BASE_URL_API } from '../../config';

export async function getBoardById(id) {
  try {
    const res = await axios.get(`${BASE_URL_API}/boards/${id}`);
    return res.data;
  }
  catch (err) {
    throw Error(err.response.data.error)
  }
}

export async function getBoardsByField(field, value) {
  try {
    const res = await axios.get(`${BASE_URL_API}/boards?${field}=${value}`);
    return res.data;
  }
  catch (err) {
    throw Error(err.response.data.error)
  }
}

export async function addBoard(board) {
  try {
    const res = await axios.post(`${BASE_URL_API}/boards`, board, { withCredentials: true });
    return res.data;
  }
  catch (err) {
    throw Error(err.response.data.error)
  }
}

export async function updateBoardById(id, data) {
  try {
    const res = await axios.put(`${BASE_URL_API}/boards/${id}`, data, { withCredentials: true });
    return res.data;
  }
  catch (err) {
    throw Error(err.response.data.error)
  }
}

export async function deleteBoardById(id) {
  try {
    const res = await axios.delete(`${BASE_URL_API}/boards/${id}`, { withCredentials: true });
    return res.data;
  }
  catch (err) {
    throw Error(err.response.data.error)
  }
}

