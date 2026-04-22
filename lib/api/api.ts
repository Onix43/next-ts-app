import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://expense-tracker-v2.b.goit.study',
  withCredentials: true,
});

import { cookies } from 'next/dist/server/request/cookies';

interface UpdateProfileImage {
  avatarUrl?: File;
}

export const updateProfile = async ({
  avatarUrl,
}: UpdateProfileImage): Promise<UpdateProfileImage> => {
  const form = new FormData();
  form.append('avatar', avatarUrl as Blob);

  const cookieStore = await cookies();
  cookieStore.set(
    'accessToken',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5Y2ZmMDYxNGJiOTk2MzVkZjc2NmNkYSIsImlhdCI6MTc3NTIzNTE4MiwiZXhwIjoxNzc1MjM2MDgyfQ.bGuXGjb3DmgBTb-JwLgTRVta3_-1sXEnCBgeK7UXh7Y'
  );
  cookieStore.set(
    'refreshToken',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5Y2ZmMDYxNGJiOTk2MzVkZjc2NmNkYSIsImlhdCI6MTc3NTIzNTE4MiwiZXhwIjoxNzc3ODI3MTgyfQ.hHzzexmpNLCr91Y-MJkXlzqGoFenDpuH110SRBhhI-g'
  );

  const { data } = await api.patch<UpdateProfileImage>('/users/info', form, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
