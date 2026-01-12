'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Pencil } from 'lucide-react';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateLink } from './actions';
import type { Link } from '@/db/schema';

interface EditLinkDialogProps {
  link: Link;
}

export function EditLinkDialog({ link }: EditLinkDialogProps) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState(link.originalUrl);
  const [customSlug, setCustomSlug] = useState(link.shortCode);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await updateLink({ linkId: link.id, url, customSlug });

      if (result.error) {
        toast.error('Failed to update link', {
          description: result.error,
        });
      } else if (result.success) {
        toast.success('Link updated successfully!', {
          description: 'Your changes have been saved.',
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
    if (!newOpen) {
      // Reset form state when closing
      setUrl(link.originalUrl);
      setCustomSlug(link.shortCode);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm'>
          <Pencil className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-131.25'>
        <DialogHeader>
          <DialogTitle>Edit Link</DialogTitle>
          <DialogDescription>
            Update the URL or custom slug for this shortened link.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4 py-4'>
            <div className='grid gap-2'>
              <Label htmlFor='url'>URL</Label>
              <Input
                id='url'
                type='url'
                placeholder='https://example.com'
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='customSlug'>Custom Slug</Label>
              <Input
                id='customSlug'
                type='text'
                placeholder='my-custom-link'
                value={customSlug}
                onChange={(e) => setCustomSlug(e.target.value)}
                disabled={loading}
                pattern='[a-zA-Z0-9_-]*'
                minLength={3}
                maxLength={20}
              />
              <p className='text-sm text-muted-foreground'>
                Letters, numbers, hyphens, and underscores only
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type='submit' disabled={loading}>
              {loading ? 'Updating...' : 'Update Link'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
