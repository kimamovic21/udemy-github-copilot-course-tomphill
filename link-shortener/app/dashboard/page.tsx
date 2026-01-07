import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const DashboardPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect('/');
  }

  return (
    <main>
      <h1>Dashboard</h1>
    </main>
  );
};

export default DashboardPage;
