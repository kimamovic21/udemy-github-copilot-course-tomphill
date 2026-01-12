import { db } from '@/db';
import { links, type Link, type NewLink } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { nanoid } from 'nanoid';

/**
 * Fetches all links for a specific user
 * @param userId - The authenticated user's ID
 * @returns Array of links belonging to the user, ordered by updatedAt (latest first)
 */
export async function getUserLinks(userId: string): Promise<Link[]> {
  return await db
    .select()
    .from(links)
    .where(eq(links.userId, userId))
    .orderBy(desc(links.updatedAt));
}

/**
 * Creates a new link for a user
 * @param userId - The authenticated user's ID
 * @param originalUrl - The URL to shorten
 * @param customSlug - Optional custom short code
 * @returns The created link
 */
export async function createLink(
  userId: string,
  originalUrl: string,
  customSlug?: string
): Promise<Link> {
  const shortCode = customSlug || nanoid(8);

  const newLink: NewLink = {
    userId,
    originalUrl,
    shortCode,
  };

  const [createdLink] = await db.insert(links).values(newLink).returning();

  return createdLink;
}
