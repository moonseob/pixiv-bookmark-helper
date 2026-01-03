import { useEffect, useState } from 'react';
import { queryActiveTab } from '@/pixiv/chrome';

export type PixivContextState = 'checking' | 'allowed' | 'blocked';

export default function usePixivContext() {
  const [pixivContext, setPixivContext] =
    useState<PixivContextState>('checking');

  useEffect(() => {
    const checkTab = async () => {
      try {
        const tab = await queryActiveTab();
        const url = tab?.url;
        if (!url) {
          setPixivContext('blocked');
          return;
        }
        const host = new URL(url).hostname;
        if (host !== 'www.pixiv.net') {
          setPixivContext('blocked');
          return;
        }
        setPixivContext('allowed');
      } catch {
        setPixivContext('blocked');
      }
    };
    void checkTab();
  }, []);

  return { pixivContext };
}
