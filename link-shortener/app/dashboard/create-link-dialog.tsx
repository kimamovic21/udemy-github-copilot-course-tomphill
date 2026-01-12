'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { createLink } from './actions';

interface FormData {
  url: string;
  customSlug?: string;
}

export const CreateLinkDialog = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    defaultValues: {
      url: '',
      customSlug: '',
    },
  });

  const handleSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const result = await createLink({
        url: data.url,
        customSlug: data.customSlug || undefined,
      });

      if (result.error) {
        toast.error(result.error);
      } else if (result.success) {
        toast.success(`Link created! Short code: ${result.shortCode}`);
        form.reset();
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to create link');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className='w-4 h-4 mr-2' />
          Create New Link
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Short Link</DialogTitle>
          <DialogDescription>Enter the URL you want to shorten</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='url'
              rules={{
                required: 'URL is required',
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Original URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='https://example.com/very/long/url'
                      {...field}
                      disabled={isLoading}
                      type='url'
                    />
                  </FormControl>
                  <FormDescription>The full URL you want to shorten</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='customSlug'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Custom Slug (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='my-custom-slug'
                      {...field}
                      disabled={isLoading}
                      maxLength={20}
                    />
                  </FormControl>
                  <FormDescription>
                    Use only letters, numbers, hyphens, and underscores (3-20 characters)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex justify-end gap-3 pt-4'>
              <Button
                type='button'
                variant='outline'
                onClick={() => setOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Link'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
