'use client';
import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';

export default function Profile() {
  const [file, setFile] = useState<File | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    const res = await axios.post('/api/upload', formData);
    setAvatar(res.data.url);
  };
  return (
    <div>
      <h1>Upload avatar</h1>

      <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />

      <button onClick={handleUpload}>Upload</button>

      {avatar && (
        <Image src={avatar} width={200} alt="user-avatar" height={200} />
      )}
    </div>
  );
}
