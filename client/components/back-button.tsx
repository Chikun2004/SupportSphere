"use client";

import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  // Don't show back button on main pages
  if (pathname === '/' || pathname === '/about' || pathname === '/pricing' || pathname === '/contact-sales') {
    return null;
  }

  const handleBack = () => {
    // Handle authentication flow
    if (pathname?.includes('/auth/')) {
      router.push('/');
      return;
    }

    // Handle dashboard navigation
    if (pathname?.includes('/dashboard/')) {
      if (pathname?.includes('/customer')) {
        router.push('/');
      } else if (pathname?.includes('/support')) {
        router.push('/');
      }
      return;
    }

    // Handle ticket details navigation
    if (pathname?.includes('/tickets/')) {
      const userType = pathname?.includes('support') ? 'support' : 'customer';
      router.push(`/dashboard/${userType}`);
      return;
    }

    // Handle demo page
    if (pathname === '/demo') {
      router.push('/');
      return;
    }

    // Handle payment page
    if (pathname === '/payment') {
      router.push('/pricing');
      return;
    }

    // Default fallback
    router.back();
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="fixed top-20 left-4 gap-2 z-50 hover:bg-background/80 backdrop-blur-sm"
      onClick={handleBack}
    >
      <ChevronLeft className="h-4 w-4" />
      Back
    </Button>
  );
}