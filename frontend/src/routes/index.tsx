import { createFileRoute, redirect } from '@tanstack/react-router';
import { getSession } from '@/lib/auth';

export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    const session = await getSession();
    
    if (session?.data) {
      throw redirect({
        to: '/families',
      });
    } else {
      throw redirect({
        to: '/login',
      });
    }
  },
  component: () => <div>Redirecting...</div>,
});