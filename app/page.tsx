'use client';

import TodoList from '@/components/TodoList';
import { updateProfile } from '@/lib/api/api';

export default function ImageLoader() {
  const handleSubmit = async (formData: FormData) => {
    const file = formData.get('avatar') as File;
    if (!file) return;

    const res = await updateProfile({ avatarUrl: file });
    console.log(res);
  };
  return (
    <>
      <TodoList />
    </>
  );
}
