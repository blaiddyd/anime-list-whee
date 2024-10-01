'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from '../providers';
import AnimeList from '../_components/AnimeList';

export default function Codex() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const { userInfo } = useSession(); 

  useEffect(() => {
    if (!userInfo) {
      const pageParam = searchParams.get('page') || '1'
      router.push(`/login?redirect=${encodeURIComponent(`codex?page=${pageParam}`)}`);
    }
  }, [userInfo, router, searchParams]);

  if (!userInfo) {
    return null
  }

  return <AnimeList />
  
}
