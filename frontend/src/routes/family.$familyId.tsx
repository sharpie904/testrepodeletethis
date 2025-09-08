import { createFileRoute, redirect } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { getSession } from '@/lib/auth';
import { api } from '@/lib/api';
import { FamilyPage } from '@/components/family/FamilyPage';

export const Route = createFileRoute('/family/$familyId')({
  beforeLoad: async () => {
    const session = await getSession();
    if (!session?.data) {
      throw redirect({
        to: '/login',
      });
    }
  },
  component: FamilyPageComponent,
});

function FamilyPageComponent() {
  const { familyId } = Route.useParams();
  
  const { data: organization, isLoading: orgLoading } = useQuery({
    queryKey: ['organization', familyId],
    queryFn: () => api.organizations.get(familyId),
  });

  const { data: familyMembers, isLoading: membersLoading } = useQuery({
    queryKey: ['familyMembers', familyId],
    queryFn: () => api.familyMembers.list(familyId),
  });

  const { data: userRole } = useQuery({
    queryKey: ['userRole', familyId],
    queryFn: () => api.familyMembers.getRole(familyId),
  });

  if (orgLoading || membersLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading family...</div>
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">Family not found</div>
      </div>
    );
  }

  return (
    <FamilyPage
      organization={organization}
      familyMembers={familyMembers || []}
      userRole={userRole?.role || null}
    />
  );
}