import { useCallback, useEffect, useState } from 'react';
import { sendMessage } from '@/pixiv/chrome';
import { ExtensionMessageType } from '@/shared/messages';
import {
  clearSessionUser,
  getSessionUser,
  setSessionUser,
} from '@/storage/sessionUser';

export type AuthStatus = 'checking' | 'ready' | 'needs_login' | 'error';

interface ResolveUserIdResponse {
  ok: boolean;
  userId?: string;
  error?: string;
}

export const useLoginStatus = (enabled = true) => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>('checking');
  const [userId, setUserId] = useState<string | null>(null);
  // const [profile, setProfile] = useState<UserProfile | null>(null);

  const checkLogin = useCallback(
    async (force = false) => {
      if (!enabled) {
        return;
      }
      setAuthStatus('checking');

      if (!force) {
        const cached = await getSessionUser();
        if (cached?.userId) {
          setAuthStatus('ready');
          setUserId(cached.userId);
          return;
        }
      }

      try {
        const response = await sendMessage<ResolveUserIdResponse>({
          type: ExtensionMessageType.ResolveUser,
        });
        if (response.ok && response.userId) {
          setAuthStatus('ready');
          setUserId(response.userId);
          await setSessionUser(response.userId);
          return;
        }
        throw new Error(response.error ?? 'Failed to resolve user ID.');
      } catch {
        setAuthStatus('needs_login');
        setUserId(null);
        await clearSessionUser();
      }
    },
    [enabled],
  );

  useEffect(() => {
    void checkLogin();
  }, [checkLogin]);

  return {
    authStatus,
    userId,
    refresh: () => checkLogin(true),
  };
};
