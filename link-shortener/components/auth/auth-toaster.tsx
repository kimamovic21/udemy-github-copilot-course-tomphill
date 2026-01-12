'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser } from '@clerk/nextjs';
import { toast } from 'sonner';

export function AuthToaster() {
  const { isSignedIn } = useAuth();
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const prevSignedIn = useRef<boolean | undefined>(undefined);
  const toastShownForUser = useRef<string | null>(null);

  useEffect(() => {
    if (!isLoaded) return;

    // Skip first render - just initialize
    if (prevSignedIn.current === undefined) {
      prevSignedIn.current = isSignedIn;
      return;
    }

    // User signed in - show toast only once per user
    if (isSignedIn && !prevSignedIn.current && user) {
      if (toastShownForUser.current !== user.id) {
        const isNewAccount = Date.now() - user.createdAt < 60000; // 60 seconds

        if (isNewAccount) {
          toast.success('Account created successfully!');
        } else {
          toast.success('Signed in successfully!');
        }

        toastShownForUser.current = user.id;
      }
      // Redirect to dashboard after sign in
      router.push('/dashboard');
    }

    // User signed out
    if (!isSignedIn && prevSignedIn.current) {
      toast.success('Signed out successfully!');
      toastShownForUser.current = null;
    }

    prevSignedIn.current = isSignedIn;
  }, [isSignedIn, isLoaded, user, router]);

  return null;
}
