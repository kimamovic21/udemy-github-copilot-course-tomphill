import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreateLinkDialog } from './create-link-dialog';
import { getUserLinks } from '@/data/links';

const DashboardPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect('/');
  }

  const userLinks = await getUserLinks(userId);

  return (
    <main className='container mx-auto p-8'>
      <div className='mb-8 flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold mb-2'>Dashboard</h1>
          <p className='text-muted-foreground'>Manage your shortened links</p>
        </div>
        <CreateLinkDialog />
      </div>

      {userLinks.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No links yet</CardTitle>
            <CardDescription>Create your first shortened link to get started</CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className='grid gap-4'>
          {userLinks.map((link) => (
            <Card key={link.id}>
              <CardHeader>
                <CardTitle className='text-lg font-medium break-all'>{link.shortCode}</CardTitle>
                <CardDescription className='break-all'>{link.originalUrl}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='flex flex-col gap-2 text-sm text-muted-foreground'>
                  <div>
                    <span className='font-medium'>Short URL:</span>{' '}
                    <a
                      href={`/${link.shortCode}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-primary hover:underline'
                    >
                      {`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/${
                        link.shortCode
                      }`}
                    </a>
                  </div>
                  <div>
                    <span className='font-medium'>Created:</span>{' '}
                    {new Date(link.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
};

export default DashboardPage;
