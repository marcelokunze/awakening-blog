import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import TestButton from '@/components/TestButton';

export default async function TestPage() {
  const supabase = await createClient();
  // Verify the user by calling getUser() on the server side
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-24">
      <TestButton />
    </main>
  );
}
