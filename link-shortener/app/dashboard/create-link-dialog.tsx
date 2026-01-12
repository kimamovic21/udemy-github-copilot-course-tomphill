'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Plus } from 'lucide-react';
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
import { createLink } from './actions';

export function CreateLinkDialog() {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await createLink({ url, customSlug });

      if (result.error) {
        toast.error('Failed to create link', {
          description: result.error,
        });
      } else if (result.success) {
        toast.success('Link created successfully!', {
          description: 'Your shortened link is ready to use.',
        });
        // Reset form
        setUrl('');
        setCustomSlug('');
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
      setUrl('');
      setCustomSlug('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className='mr-2 h-4 w-4' />
          Create Link
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-131.25'>
        <DialogHeader>
          <DialogTitle>Create Shortened Link</DialogTitle>
          <DialogDescription>
            Enter a URL to shorten. You can optionally provide a custom slug.
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
              <Label htmlFor='customSlug'>
                Custom Slug <span className='text-muted-foreground'>(Optional)</span>
              </Label>
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
                Leave empty to auto-generate a short code
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
              {loading ? 'Creating...' : 'Create Link'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
