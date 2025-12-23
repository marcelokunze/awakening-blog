'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const FooterNavigation = () => {
  return (
    <footer className="fixed bottom-0 z-50 w-full bg-black px-4 py-2">
      <div className="flex items-center justify-between w-full">
        <Link href="/home">
          <Button
            variant="ghost"
            size="xs"
            className="text-gray-400 hover:text-white flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
        <Link href="/feedback">
          <Button
            variant="ghost"
            size="xs"
            className="text-gray-400 hover:text-white"
          >
            Feedback
          </Button>
        </Link>
      </div>
    </footer>
  );
};

export default FooterNavigation;
