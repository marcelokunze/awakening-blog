'use client';

import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function DisconnectButton() {
  const supabase = createClient();
  const router   = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <Button variant="destructive" size="sm" onClick={handleSignOut}>
      Disconnect
    </Button>
  );
}
