import { nextServer } from './api';

interface UserData {
  email: string;
  password: string;
}

export async function register(userData: UserData) {
  const res = await nextServer.post('https://some-api/register', userData);
  return res.data;
}

export async function login(userData: UserData) {
  const res = await nextServer.post('https://some-api/login', userData);
  return res.data;
}

export async function logout() {
  const res = await nextServer.post('https://some-api/logout');
  return res.data;
}
