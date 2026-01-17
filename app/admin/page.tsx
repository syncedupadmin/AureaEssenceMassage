import { redirect } from 'next/navigation';
import { getSessionFromCookies } from '@/lib/admin-auth';
import AdminDashboard from './AdminDashboard';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const isAuthenticated = await getSessionFromCookies();

  if (!isAuthenticated) {
    redirect('/admin/login');
  }

  return <AdminDashboard />;
}
