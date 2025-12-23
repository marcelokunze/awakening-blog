"use client";

import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useUser } from '@/contexts/UserContext';

export default function ProfileSection() {
  const router = useRouter();
  const supabase = createClient();
  const { user, loading: userLoading } = useUser();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (userLoading || !user) {
    return null;
  }

  const email = user.email ?? '';
  const avatarUrl = user.user_metadata?.avatar_url;

  return (
    <div className="w-full max-w-xl flex items-center space-x-8 md:space-x-6">
      <Avatar className="h-[35px] w-[35px] md:h-[70px] md:w-[70px] rounded-md bg-zinc-800">
        {avatarUrl ? (
          <AvatarImage src={avatarUrl} alt={email} />
        ) : (
          <AvatarFallback>
            <span className="text-lg font-medium text-white">
              {email[0].toUpperCase()}
            </span>
          </AvatarFallback>
        )}
      </Avatar>
      <div className="flex flex-col items-start gap-2">
        <p className="text-sm md:text-lg font-medium">{email}</p>
        <Button
          variant="ghost"
          className="text-gray-400 hover:text-white"
          size="xs"
          onClick={handleLogout}
        >
          Log out
        </Button>
      </div>
    </div>
  );
}
