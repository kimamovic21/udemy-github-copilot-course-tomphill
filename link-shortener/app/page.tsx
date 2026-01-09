import React from 'react';
import { SignUpButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Link2, BarChart3, Lock, Share2 } from 'lucide-react';

const HomePage = () => {
  return (
    <main className='min-h-screen'>
      {/* Hero Section */}
      <section className='container mx-auto px-4 py-20 text-center'>
        <h1 className='text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
          Shorten Your Links, Amplify Your Reach
        </h1>
        <p className='text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto'>
          Create short, memorable links in seconds. Track performance, manage your URLs, and share
          with confidence.
        </p>
        <div className='flex gap-4 justify-center'>
          <SignUpButton mode='modal'>
            <Button size='lg' className='text-lg px-8'>
              Get Started Free
            </Button>
          </SignUpButton>
        </div>
      </section>

      {/* Features Section */}
      <section id='features' className='container mx-auto px-4 py-20'>
        <h2 className='text-3xl md:text-4xl font-bold text-center mb-12'>
          Powerful Features for Modern Link Management
        </h2>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {/* Feature 1: URL Shortening */}
          <Card className='text-center hover:shadow-lg transition-shadow'>
            <CardHeader>
              <div className='flex justify-center mb-4'>
                <div className='p-3 bg-blue-100 dark:bg-blue-900 rounded-lg'>
                  <Link2 className='h-8 w-8 text-blue-600 dark:text-blue-400' />
                </div>
              </div>
              <CardTitle>Quick URL Shortening</CardTitle>
              <CardDescription className='mt-2'>
                Transform long URLs into short, branded links instantly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground'>
                Create concise, shareable links that are easy to remember and type.
              </p>
            </CardContent>
          </Card>

          {/* Feature 2: Analytics */}
          <Card className='text-center hover:shadow-lg transition-shadow'>
            <CardHeader>
              <div className='flex justify-center mb-4'>
                <div className='p-3 bg-green-100 dark:bg-green-900 rounded-lg'>
                  <BarChart3 className='h-8 w-8 text-green-600 dark:text-green-400' />
                </div>
              </div>
              <CardTitle>Link Analytics</CardTitle>
              <CardDescription className='mt-2'>
                Track clicks, views, and performance metrics in real-time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground'>
                Gain insights into how your links perform with detailed analytics.
              </p>
            </CardContent>
          </Card>

          {/* Feature 3: Secure Management */}
          <Card className='text-center hover:shadow-lg transition-shadow'>
            <CardHeader>
              <div className='flex justify-center mb-4'>
                <div className='p-3 bg-purple-100 dark:bg-purple-900 rounded-lg'>
                  <Lock className='h-8 w-8 text-purple-600 dark:text-purple-400' />
                </div>
              </div>
              <CardTitle>Secure Management</CardTitle>
              <CardDescription className='mt-2'>
                Manage all your links with authenticated, secure access
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground'>
                Keep your links organized and secure with user authentication.
              </p>
            </CardContent>
          </Card>

          {/* Feature 4: Easy Sharing */}
          <Card className='text-center hover:shadow-lg transition-shadow'>
            <CardHeader>
              <div className='flex justify-center mb-4'>
                <div className='p-3 bg-orange-100 dark:bg-orange-900 rounded-lg'>
                  <Share2 className='h-8 w-8 text-orange-600 dark:text-orange-400' />
                </div>
              </div>
              <CardTitle>Flexible Sharing</CardTitle>
              <CardDescription className='mt-2'>
                Share links publicly or keep them private as needed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground'>
                Control who can access your links with public or private settings.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className='container mx-auto px-4 py-20'>
        <Card className='bg-linear-to-r from-blue-600 to-purple-600 text-white border-0'>
          <CardHeader className='text-center'>
            <CardTitle className='text-3xl md:text-4xl text-white mb-4'>
              Ready to Get Started?
            </CardTitle>
            <CardDescription className='text-white/90 text-lg'>
              Join thousands of users who are already shortening and managing their links with ease.
            </CardDescription>
          </CardHeader>
          <CardContent className='flex justify-center'>
            <SignUpButton mode='modal'>
              <Button size='lg' variant='secondary' className='text-lg px-8'>
                Create Your Free Account
              </Button>
            </SignUpButton>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default HomePage;
