'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import * as yup from 'yup';

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const schema = yup.object().shape({
    password: yup
      .string()
      .required('Required password')
      .min(6, 'Password is too short'),
    email: yup.string().required('Email required').email('НInvalid email'),
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await schema.validate({ email, password }, { abortEarly: false });

      await axios.post('/api/login', { email, password });
      router.push('/dashboard');
    } catch {
      alert('Error!');
    }
  };
  return (
    <form onSubmit={submit}>
      <label htmlFor="email">Enter email</label>
      <input
        id="email"
        type="text"
        value={email}
        onChange={e => setEmail(e.target.value)}
      ></input>
      <label htmlFor="password">Enter password</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      ></input>
      <button type="submit">Login</button>
    </form>
  );
}
