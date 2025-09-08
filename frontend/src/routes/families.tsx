import { createFileRoute, redirect } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { getSession } from '@/lib/auth';
import { api } from '@/lib/api';
import { FamiliesPage } from '@/components/families/FamiliesPage';

export const Route = createFileRoute('/families')({
  beforeLoad: async () => {
    const session = await getSession();
    if (!session?.data) {
      throw redirect({
        to: '/login',
      });
    }
  },
  component: FamiliesPageComponent,
});

function FamiliesPageComponent() {
  const { data: organizations, isLoading, error } = useQuery({
    queryKey: ['organizations'],
    queryFn: api.organizations.list,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading families...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">Error loading families</div>
      </div>
    );
  }

  return <FamiliesPage organizations={organizations || []} />;
}