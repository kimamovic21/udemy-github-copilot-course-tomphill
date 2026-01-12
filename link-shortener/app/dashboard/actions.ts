'use server';

import { auth } from '@clerk/nextjs/server';
import { z } from 'zod';
import { createLink as createLinkHelper } from '@/data/links';
import { revalidatePath } from 'next/cache';

const createLinkSchema = z.object({
  url: z.string().url('Please enter a valid URL'),
  customSlug: z
    .string()
    .regex(/^[a-zA-Z0-9_-]*$/, 'Only letters, numbers, hyphens, and underscores allowed')
    .min(3, 'Custom slug must be at least 3 characters')
    .max(20, 'Custom slug must be at most 20 characters')
    .optional()
    .or(z.literal('')),
});

export interface CreateLinkInput {
  url: string;
  customSlug?: string;
}

export interface CreateLinkResult {
  success?: boolean;
  error?: string;
  shortCode?: string;
}

/**
 * Server action to create a new shortened link
 */
export async function createLink(input: CreateLinkInput): Promise<CreateLinkResult> {
  try {
    // Check authentication
    const { userId } = await auth();
    if (!userId) {
      return { error: 'Unauthorized' };
    }

    // Validate input
    const validated = createLinkSchema.parse(input);

    // Convert empty string to undefined
    const customSlug = validated.customSlug === '' ? undefined : validated.customSlug;

    // Create link via helper function
    const link = await createLinkHelper(userId, validated.url, customSlug);

    // Revalidate the dashboard page to show the new link
    revalidatePath('/dashboard');

    return { success: true, shortCode: link.shortCode };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.issues[0].message };
    }

    // Check for unique constraint violation
    if (error instanceof Error && error.message.includes('unique')) {
      return { error: 'This custom slug is already taken' };
    }

    console.error('Error creating link:', error);
    return { error: 'Failed to create link. Please try again.' };
  }
}
