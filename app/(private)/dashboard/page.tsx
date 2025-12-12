import { getUser } from '@/app/lib/auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const user = await getUser();

  if (!user) redirect('/login');
  return <div>Welcome, {user?.email}</div>;
}
