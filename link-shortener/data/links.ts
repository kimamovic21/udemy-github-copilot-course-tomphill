import { db } from '@/db';
import { links, type Link, type NewLink } from '@/db/schema';
import { and, eq, desc } from 'drizzle-orm';
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

/**
 * Updates an existing link for a user
 * @param linkId - The ID of the link to update
 * @param userId - The authenticated user's ID (for verification)
 * @param originalUrl - The new URL to shorten
 * @param shortCode - The new short code
 * @returns The updated link
 */
export async function updateLink(
  linkId: number,
  userId: string,
  originalUrl: string,
  shortCode: string
): Promise<Link> {
  const [updatedLink] = await db
    .update(links)
    .set({
      originalUrl,
      shortCode,
      updatedAt: new Date(),
    })
    .where(and(eq(links.id, linkId), eq(links.userId, userId)))
    .returning();

  return updatedLink;
}

/**
 * Fetches a link by its short code
 * @param shortCode - The short code to look up
 * @returns The link if found, null otherwise
 */
export async function getLinkByShortCode(shortCode: string): Promise<Link | null> {
  const [link] = await db.select().from(links).where(eq(links.shortCode, shortCode)).limit(1);

  return link || null;
}

/**
 * Deletes a link for a user
 * @param linkId - The ID of the link to delete
 * @param userId - The authenticated user's ID (for verification)
 * @returns The deleted link
 */
export async function deleteLink(linkId: number, userId: string): Promise<Link> {
  const [deletedLink] = await db
    .delete(links)
    .where(and(eq(links.id, linkId), eq(links.userId, userId)))
    .returning();

  return deletedLink;
}
