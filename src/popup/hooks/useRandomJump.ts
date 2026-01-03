import { useState } from 'react';
import { queryActiveTab, sendMessage } from '@/pixiv/chrome';
import { isPixivBookmarksUrl } from '@/pixiv/urls';
import type { SetStatus } from '@/popup/types';
import { ExtensionMessageType } from '@/shared/messages';

interface JumpResponse {
  ok: boolean;
  error?: string;
}

export const useRandomJump = (
  setStatus: SetStatus,
  defaultStatus: string,
  isLoggedIn: boolean,
) => {
  const [isJumping, setIsJumping] = useState(false);

  const handleJump = async () => {
    if (isJumping) return;
    if (!isLoggedIn) {
      setStatus('Please log in to pixiv first.', 'error');
      return;
    }
    setIsJumping(true);
    setStatus('Picking a random bookmark...', 'idle');
    try {
      const tab = await queryActiveTab();
      if (!isPixivBookmarksUrl(tab?.url)) {
        setStatus(defaultStatus, 'idle');
      }
      const response = await sendMessage<JumpResponse>({
        type: ExtensionMessageType.RandomRequest,
      });
      if (!response.ok) {
        throw new Error(response.error ?? 'Failed to jump.');
      }
      setStatus('Opening a random bookmark...', 'ready');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to jump.';
      if (/log\s*in|login|user id|redirect/i.test(message)) {
        setStatus('Please log in to pixiv first.', 'error');
        return;
      }
      if (message.includes('Could not establish connection')) {
        setStatus('Open a pixiv bookmarks page first.', 'error');
      } else if (message.includes('No saved bookmark stats')) {
        setStatus('Visit a bookmarks page and try again.', 'error');
      } else {
        setStatus(message, 'error');
      }
    } finally {
      setIsJumping(false);
    }
  };

  return { isJumping, handleJump };
};
