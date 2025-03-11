"use client";

import { Button } from '@/components/ui/button';
import { useRouter, usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const handleLogout = () => {
    // TODO: Implement actual logout with Supabase
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    router.push('/auth/login');
  };

  // Only show logout button in dashboard routes
  const isDashboard = pathname?.includes('/dashboard');
  // Don't show auth buttons on auth pages
  const isAuthPage = pathname?.includes('/auth/');

  return (
    <nav className="fixed top-0 right-0 p-4 z-50 flex items-center justify-end gap-4">
      {!isDashboard && !isAuthPage && (
        <>
          <Link href="/pricing">
            <Button variant="ghost" size="sm">
              Pricing
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button variant="ghost" size="sm">
              Login
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button variant="default" size="sm">
              Sign Up
            </Button>
          </Link>
        </>
      )}
      {isDashboard && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleLogout}
          className="hover:bg-destructive hover:text-destructive-foreground transition-colors"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      )}
    </nav>
  );
}