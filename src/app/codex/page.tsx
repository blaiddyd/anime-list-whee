'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '../providers';
import AnimeList from '../_components/AnimeList';

export default function Codex() {
  const router = useRouter();
  const { userInfo } = useSession(); 

  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=codex');
    }
  }, [userInfo, router]);

  if (!userInfo) {
    return null
  }

  return <AnimeList />
  
}
