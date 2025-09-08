import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

interface CreateMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organizationId: string;
}

export function CreateMemberDialog({ open, onOpenChange, organizationId }: CreateMemberDialogProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const queryClient = useQueryClient();

  const createMemberMutation = useMutation({
    mutationFn: (data: { firstName: string; lastName: string; email?: string }) =>
      api.familyMembers.create(organizationId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['familyMembers', organizationId] });
      toast.success('Family member added successfully!');
      setFirstName('');
      setLastName('');
      setEmail('');
      onOpenChange(false);
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to add family member');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) return;

    createMemberMutation.mutate({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim() || undefined,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Family Member</DialogTitle>
          <DialogDescription>
            Create a new profile for a family member. You can add more details later.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstName" className="text-right">
                First Name *
              </Label>
              <Input
                id="firstName"
                placeholder="John"
                className="col-span-3"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={createMemberMutation.isPending}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastName" className="text-right">
                Last Name *
              </Label>
              <Input
                id="lastName"
                placeholder="Doe"
                className="col-span-3"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={createMemberMutation.isPending}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com (optional)"
                className="col-span-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={createMemberMutation.isPending}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={createMemberMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!firstName.trim() || !lastName.trim() || createMemberMutation.isPending}
            >
              {createMemberMutation.isPending ? 'Adding...' : 'Add Member'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}