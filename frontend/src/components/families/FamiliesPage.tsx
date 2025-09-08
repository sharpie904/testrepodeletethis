import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useSession, signOut } from '@/lib/auth';
import { useActiveFamily } from '@/hooks/useActiveFamily';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { generateUserFallback } from '@/lib/utils';
import { LogOut, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { CreateFamilyDialog } from './CreateFamilyDialog';

interface Organization {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  Member: Array<{
    role: string;
    userId: string;
  }>;
}

interface FamiliesPageProps {
  organizations: Organization[];
}

export function FamiliesPage({ organizations }: FamiliesPageProps) {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const { data: session } = useSession();
  const { family, setActiveFamily } = useActiveFamily();
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

  const handleFamilySelect = (org: Organization) => {
    const userMember = org.Member.find(m => m.userId === session?.user?.id);
    setActiveFamily(org.id, org.name, org.slug, userMember?.role || null);
    navigate({ to: '/family/$familyId', params: { familyId: org.id } });
  };

  const userAvatarFallback = generateUserFallback(session?.user?.name || session?.user?.email || '').toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">FamilyFolio</h1>
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
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Families</h2>
          <p className="text-gray-600">
            Select a family to manage or create a new one to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Create New Family Card */}
          <Card 
            className="border-dashed border-2 hover:border-primary cursor-pointer transition-colors"
            onClick={() => setShowCreateDialog(true)}
          >
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Create New Family</CardTitle>
              <CardDescription>
                Start managing a new family's digital portfolio
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Existing Families */}
          {organizations.map((org) => {
            const userMember = org.Member.find(m => m.userId === session?.user?.id);
            const isActive = family.id === org.id;
            
            return (
              <Card 
                key={org.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  isActive ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleFamilySelect(org)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {org.name}
                    {isActive && (
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                        Active
                      </span>
                    )}
                  </CardTitle>
                  <CardDescription>
                    Role: {userMember?.role || 'Member'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Created {new Date(org.createdAt).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {organizations.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Plus className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No families yet</h3>
            <p className="text-gray-600 mb-4">
              Create your first family to start managing your digital portfolio.
            </p>
            <Button onClick={() => setShowCreateDialog(true)}>
              Create Your First Family
            </Button>
          </div>
        )}
      </main>

      <CreateFamilyDialog 
        open={showCreateDialog} 
        onOpenChange={setShowCreateDialog}
      />
    </div>
  );
}