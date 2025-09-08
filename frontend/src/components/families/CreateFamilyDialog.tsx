import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authClient } from '@/lib/auth';
import { generateSlug } from '@/lib/utils';
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

interface CreateFamilyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateFamilyDialog({ open, onOpenChange }: CreateFamilyDialogProps) {
  const [familyName, setFamilyName] = useState('');
  const queryClient = useQueryClient();

  const createFamilyMutation = useMutation({
    mutationFn: async (data: { name: string; slug: string }) => {
      const response = await authClient.organization.create(data);
      if (response.error) {
        throw new Error(response.error.message);
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
      toast.success('Family created successfully!');
      setFamilyName('');
      onOpenChange(false);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create family');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!familyName.trim()) return;

    createFamilyMutation.mutate({
      name: familyName.trim(),
      slug: generateSlug(familyName.trim()),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Family</DialogTitle>
          <DialogDescription>
            Give your family a name to start managing your digital portfolio.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="familyName" className="text-right">
                Name
              </Label>
              <Input
                id="familyName"
                placeholder="e.g., The Smith Family"
                className="col-span-3"
                value={familyName}
                onChange={(e) => setFamilyName(e.target.value)}
                disabled={createFamilyMutation.isPending}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={createFamilyMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!familyName.trim() || createFamilyMutation.isPending}
            >
              {createFamilyMutation.isPending ? 'Creating...' : 'Create Family'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}