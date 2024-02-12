import axios from 'axios';
import { BASE_URL_API } from '../../config';

export async function addTask(task) {
  try {
    const res = await axios.post(`${BASE_URL_API}/tasks`, task, { withCredentials: true });
    return res.data;
  }
  catch (err) {
    throw Error(err.response.data.error)
  }
}

export async function getTasksByField(field, value) {
  try {
    const res = await axios.get(`${BASE_URL_API}/tasks?${field}=${value}`);
    return res.data;
  }
  catch (err) {
    throw Error(err.response.data.error)
  }
}

export async function getTasksById(id) {
  try {
    const res = await axios.get(`${BASE_URL_API}/tasks/${id}`);
    return res.data;
  }
  catch (err) {
    throw Error(err.response.data.error)
  }
}

export async function updateTaskById(id, data) {
  try {
    const res = await axios.put(`${BASE_URL_API}/tasks/${id}`, data, { withCredentials: true });
    return res.data;
  }
  catch (err) {
    throw Error(err.response.data.error)
  }
}

export async function deleteTasksById(id) {
  try {
    const res = await axios.delete(`${BASE_URL_API}/tasks/${id}`, { withCredentials: true });
    return res.data;
  }
  catch (err) {
    throw Error(err.response.data.error)
  }
}

export async function deleteTasksByField(field, value) {
  try {
    const res = await axios.delete(`${BASE_URL_API}/tasks?${field}=${value}`, { withCredentials: true });
    return res.data;
  }
  catch (err) {
    throw Error(err.response.data.error)
  }
}