'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { deleteLink } from './actions';

interface DeleteLinkDialogProps {
  linkId: number;
  shortCode: string;
}

export function DeleteLinkDialog({ linkId, shortCode }: DeleteLinkDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    try {
      const result = await deleteLink({ linkId });

      if (result.error) {
        toast.error('Failed to delete link', {
          description: result.error,
        });
      } else if (result.success) {
        toast.success('Link deleted successfully!', {
          description: 'The link has been permanently removed.',
        });
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
      toast.error('An unexpected error occurred', {
        description: 'Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm'>
          <Trash2 className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-106.25'>
        <DialogHeader>
          <DialogTitle>Delete Link</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the link with short code{' '}
            <span className='font-semibold'>{shortCode}</span>? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type='button' variant='outline' onClick={() => setOpen(false)} disabled={loading}>
            Cancel
          </Button>
          <Button type='button' variant='destructive' onClick={handleDelete} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
