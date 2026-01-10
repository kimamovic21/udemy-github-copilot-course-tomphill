import 'dotenv/config';
import { db } from './index';
import { links, type NewLink } from './schema';

const userId = process.env.CLERK_USER_ID;
if (!userId) {
  throw new Error('CLERK_USER_ID is not set in the environment');
}

const sampleLinks: NewLink[] = [
  {
    userId,
    originalUrl: 'https://www.neon.tech/',
    shortCode: 'neon-home',
  },
  {
    userId,
    originalUrl: 'https://github.com/kimamovic21',
    shortCode: 'gh-kimamovic',
  },
  {
    userId,
    originalUrl: 'https://news.ycombinator.com/',
    shortCode: 'hn-front',
  },
  {
    userId,
    originalUrl: 'https://x.com/',
    shortCode: 'twitter-x',
  },
  {
    userId,
    originalUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    shortCode: 'yt-rick',
  },
  {
    userId,
    originalUrl: 'https://vercel.com/',
    shortCode: 'vercel',
  },
  {
    userId,
    originalUrl: 'https://nextjs.org/docs',
    shortCode: 'next-docs',
  },
  {
    userId,
    originalUrl: 'https://react.dev/learn',
    shortCode: 'react-learn',
  },
  {
    userId,
    originalUrl: 'https://www.typescriptlang.org/tsconfig',
    shortCode: 'ts-tsconfig',
  },
  {
    userId,
    originalUrl: 'https://drizzle.team/docs/overview',
    shortCode: 'drizzle-docs',
  },
];

async function main() {
  console.log('Seeding 10 links for user:', userId);

  const inserted = await db
    .insert(links)
    .values(sampleLinks)
    .onConflictDoNothing({ target: links.shortCode })
    .returning({ id: links.id, shortCode: links.shortCode });

  console.log(`Inserted: ${inserted.length} rows`);
  if (inserted.length) {
    console.table(inserted);
  }
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
