'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useLayoutEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '@/components/ui/drawer';
import { MenuIcon, X as CloseIcon } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface NavbarProps {
  onCreateSession?: () => void;
}

export default function Navbar({ onCreateSession }: NavbarProps) {
  const supabase = createClient();
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUser();

  // Prevent hydration flash: delay pathname check until layout effect
  const [mounted, setMounted] = useState(false);
  useLayoutEffect(() => {
    setMounted(true);
  }, []);
  const isLanding = mounted && pathname === '/';

  // Shadow-on-scroll
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // OAuth flow
  const handleSignIn = async () => {
    const origin = window.location.origin;
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${origin}/auth/callback?next=/home` },
    });
  };

  const handleCreate = onCreateSession ?? (() => router.push("/new/1"));

  // Main button logic
  const renderMainButton = () => {
    if (!user) {
      return (
        <Button variant="accent" size="xs" onClick={handleSignIn}>
          Start for Free
        </Button>
      );
    }
    if (isLanding) {
      return (
        <Link href="/home">
          <Button variant="accent" size="xs">
            Open App
          </Button>
        </Link>
      );
    }
    return (
      <Link href="/settings">
        <Avatar className="h-8 w-8 rounded-md md:hover:opacity-80 transition-opacity duration-200">
          <AvatarImage src={user.user_metadata.avatar_url} alt={user.email} />
          <AvatarFallback>
            <span className="text-sm rounded-md font-medium text-white">
              {user.email?.[0].toUpperCase()}
            </span>
          </AvatarFallback>
        </Avatar>
      </Link>
    );
  };

  return (
    <header
      className={`
        sticky top-0 z-50 w-full px-4 py-2 overflow-x-hidden
        ${isLanding ? 'bg-background' : 'bg-black'}
        ${scrolled ? 'border-b border-muted/70' : ''}
      `}
    >
      <div className="mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href={user ? '/home' : '/'}>
          <Image
            src="/zenpersonal-logo-white-eclipse.svg"
            alt="Zen Personal Logo"
            width={128}
            height={23}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-4">
          <Link href="/blog">
            <Button variant="ghost" size="xs" className="text-gray-400 hover:text-white">
              Blog
            </Button>
          </Link>
          <Link href="/pricing">
            <Button variant="ghost" size="xs" className="text-gray-400 hover:text-white">
              Pricing
            </Button>
          </Link>
          {mounted ? renderMainButton() : <div className="h-8" />}
        </nav>

        {/* Mobile nav */}
        <div className="flex md:hidden items-center space-x-2">
          {/* Drawer trigger */}
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="default">
                <MenuIcon className="w-5 h-5" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="p-4">
              <DrawerHeader className="flex items-center justify-between">
                <DrawerTitle>Menu</DrawerTitle>
                <DrawerClose asChild>
                  <Button variant="ghost" size="default">
                    <CloseIcon className="w-5 h-5" />
                  </Button>
                </DrawerClose>
              </DrawerHeader>

              <div className="flex flex-col space-y-4 mt-4">
                {!user ? (
                  <DrawerClose asChild>
                    <Button variant="accent" size="default" className="w-full" onClick={handleSignIn}>
                      Start for Free
                    </Button>
                  </DrawerClose>
                ) : isLanding ? (
                  <DrawerClose asChild>
                    <Link href="/home">
                      <Button variant="accent" size="default" className="w-full">
                        Open App
                      </Button>
                    </Link>
                  </DrawerClose>
                ) : (
                  <DrawerClose asChild>
                    <Button variant="secondary" size="default" className="w-full" onClick={handleCreate}>
                      Create New Session
                    </Button>
                  </DrawerClose>
                )}

                <hr className="border-muted/50" />

                <DrawerClose asChild>
                  <Link href="/settings">
                    <Button variant="secondary" size="default" className="w-full">
                      Settings
                    </Button>
                  </Link>
                </DrawerClose>
                <DrawerClose asChild>
                  <Link href="/blog">
                    <Button variant="secondary" size="default" className="w-full">
                      Blog
                    </Button>
                  </Link>
                </DrawerClose>
                <DrawerClose asChild>
                  <Link href="/pricing">
                    <Button variant="secondary" size="default" className="w-full">
                      Pricing
                    </Button>
                  </Link>
                </DrawerClose>
              </div>
            </DrawerContent>
          </Drawer>

          {/* Standalone mobile button/avatar */}
          {mounted ? (
            renderMainButton()
          ) : (
            <div className="w-8 h-8" />
          )}
        </div>
      </div>
    </header>
  );
}
