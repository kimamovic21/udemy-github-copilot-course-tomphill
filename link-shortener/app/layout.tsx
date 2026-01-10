import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { ThemeProvider } from '../components/theme/theme-provider';
import { ModeToggle } from '../components/theme/mode-toggle';
import { Button } from '../components/ui/button';
import './globals.css';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Link Shortener',
  description: 'Shorten your links with ease',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang='en' suppressHydrationWarning>
        <body className={`${poppins.variable} antialiased`}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <header className='border-b'>
              <nav className='container mx-auto px-4 py-4 flex justify-between items-center'>
                <h1 className='text-xl font-bold'>Link Shortener</h1>
                <div className='flex items-center gap-4'>
                  <ModeToggle />
                  <SignedOut>
                    <SignInButton mode='modal'>
                      <Button variant='outline'>Sign In</Button>
                    </SignInButton>
                    <SignUpButton mode='modal'>
                      <Button>Sign Up</Button>
                    </SignUpButton>
                  </SignedOut>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </div>
              </nav>
            </header>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
