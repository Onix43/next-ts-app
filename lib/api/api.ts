import axios from 'axios';

export const nextServer = axios.create({
  baseURL: '',
  withCredentials: true,
});
