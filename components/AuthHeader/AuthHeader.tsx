'use client';
import { api } from '@/lib/api/api';
import { useUserStore } from '@/lib/userStore/userStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthHeader() {
  const { user, clearUser, setUser, loading, toggleLoading } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    const check = async () => {
      toggleLoading(true);
      const user = await api.post('/auth/me');
      toggleLoading(false);
      if (!user) clearUser();
      setUser(user.data.user);
    };
    check();
  }, []);

  const handleLogout = async () => {
    toggleLoading(true);
    await api.post('/auth/logout');
    clearUser();
    toggleLoading(false);
    router.push('/');
  };
  return (
    <header>
      <div className="header">
        <Link href="/">Home</Link>
        {loading && <p>Loading...</p>}
        {!user && (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
        {user && (
          <>
            <p>Hello, {user}!</p>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/profile">Profile</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </header>
  );
}
