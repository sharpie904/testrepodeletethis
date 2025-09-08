import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useSession, signOut } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { generateUserFallback } from '@/lib/utils';
import { ArrowLeft, LogOut, Plus, Settings, UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import { CreateMemberDialog } from './CreateMemberDialog';

interface FamilyMember {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  createdAt: string;
}

interface Organization {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  Member: Array<{
    id: string;
    email: string;
    role: string;
    userId: string;
  }>;
}

interface FamilyPageProps {
  organization: Organization;
  familyMembers: FamilyMember[];
  userRole: string | null;
}

export function FamilyPage({ organization, familyMembers, userRole }: FamilyPageProps) {
  const [showCreateMemberDialog, setShowCreateMemberDialog] = useState(false);
  const { data: session } = useSession();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      navigate({ to: '/login' });
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  const canManageMembers = userRole === 'owner' || userRole === 'admin';
  const userAvatarFallback = generateUserFallback(session?.user?.name || session?.user?.email || '').toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate({ to: '/families' })}
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Families
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <h1 className="text-2xl font-bold text-gray-900">{organization.name}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {session?.user?.name || session?.user?.email}
              </span>
              <Avatar className="h-8 w-8">
                <AvatarImage src={session?.user?.image} alt="Avatar" />
                <AvatarFallback className="bg-transparent">
                  {userAvatarFallback}
                </AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Family Members Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Family Members</h2>
              <p className="text-gray-600">
                Manage your family members and their profiles.
              </p>
            </div>
            {canManageMembers && (
              <Button onClick={() => setShowCreateMemberDialog(true)}>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Add Member Card (for admins/owners) */}
            {canManageMembers && (
              <Card 
                className="border-dashed border-2 hover:border-primary cursor-pointer transition-colors"
                onClick={() => setShowCreateMemberDialog(true)}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Plus className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Add Family Member</CardTitle>
                  <CardDescription>
                    Create a new profile for a family member
                  </CardDescription>
                </CardHeader>
              </Card>
            )}

            {/* Existing Family Members */}
            {familyMembers.map((member) => {
              const memberFallback = generateUserFallback(`${member.firstName} ${member.lastName}`).toUpperCase();
              
              return (
                <Card key={member.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {memberFallback}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">
                          {member.firstName} {member.lastName}
                        </CardTitle>
                        {member.email && (
                          <CardDescription>{member.email}</CardDescription>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Added {new Date(member.createdAt).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {familyMembers.length === 0 && (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <UserPlus className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No family members yet</h3>
              <p className="text-gray-600 mb-4">
                Start by adding family members to create their profiles.
              </p>
              {canManageMembers && (
                <Button onClick={() => setShowCreateMemberDialog(true)}>
                  Add Your First Family Member
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Collaborators Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Collaborators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {organization.Member.map((member) => {
              const memberFallback = generateUserFallback(member.email).toUpperCase();
              const isCurrentUser = member.userId === session?.user?.id;
              
              return (
                <Card key={member.id}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-secondary">
                          {memberFallback}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">
                          {member.email}
                          {isCurrentUser && (
                            <span className="text-sm text-gray-500 ml-2">(You)</span>
                          )}
                        </CardTitle>
                        <CardDescription className="capitalize">
                          {member.role}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </main>

      <CreateMemberDialog 
        open={showCreateMemberDialog} 
        onOpenChange={setShowCreateMemberDialog}
        organizationId={organization.id}
      />
    </div>
  );
}