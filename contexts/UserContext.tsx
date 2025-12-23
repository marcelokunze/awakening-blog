'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import type { User } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client';

interface UserContextType {
  user: User | null;
  tier: 'free' | 'starter' | 'pro' | null;
  loading: boolean; // true while fetching auth/tier
}

const UserContext = createContext<UserContextType>({
  user: null,
  tier: null,
  loading: true,
});

export function UserProvider({
  user: initialUser,
  children,
}: {
  user: User | null;
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(initialUser);
  const [tier, setTier] = useState<UserContextType['tier']>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  // Watch auth changes
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, [supabase]);

  // Whenever user changes, fetch their tier (or clear if not signed in)
  useEffect(() => {
    if (!user) {
      setTier(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch('/api/profile')
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data: { current_tier: UserContextType['tier'] }) => {
        setTier(data.current_tier);
      })
      .catch(() => {
        setTier(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  return (
    <UserContext.Provider value={{ user, tier, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
