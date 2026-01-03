import { useEffect, useState } from 'react';
import { queryActiveTab } from '@/pixiv/chrome';
import { buildBookmarksPageUrl, parseBookmarkTagFromUrl } from '@/pixiv/urls';
import {
  getBookmarkTagFilter,
  setBookmarkTagFilter,
} from '@/storage/bookmarkTagFilter';

type UseBookmarkTagFilterResult = {
  currentTagName: string;
  clearTag: () => Promise<void>;
};

export const useBookmarkTagFilter = (
  userId: string | null,
): UseBookmarkTagFilterResult => {
  const [currentTagName, setCurrentTagName] = useState('');

  useEffect(() => {
    let isMounted = true;
    const loadStoredTag = async () => {
      try {
        const stored = await getBookmarkTagFilter();
        if (!isMounted) return;
        setCurrentTagName(stored.tagName);
      } catch {
        // ignore storage errors
      }
    };
    void loadStoredTag();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const applyFromTab = (tab?: chrome.tabs.Tab) => {
      if (!isMounted) return;
      const tagName = parseBookmarkTagFromUrl(tab?.url);
      if (tagName === null) return;
      setCurrentTagName(tagName);
      void setBookmarkTagFilter(tagName);
    };
    const loadTab = async () => {
      try {
        const tab = await queryActiveTab();
        applyFromTab(tab);
      } catch {
        // ignore tab errors
      }
    };
    void loadTab();
    const handleUpdated = (
      _tabId: number,
      changeInfo: { url?: string },
      tab: chrome.tabs.Tab,
    ) => {
      if (!tab.active || !changeInfo.url) return;
      applyFromTab(tab);
    };
    const handleActivated = async () => {
      await loadTab();
    };
    chrome.tabs.onUpdated.addListener(handleUpdated);
    chrome.tabs.onActivated.addListener(handleActivated);
    return () => {
      isMounted = false;
      chrome.tabs.onUpdated.removeListener(handleUpdated);
      chrome.tabs.onActivated.removeListener(handleActivated);
    };
  }, []);

  const clearTag = async () => {
    if (!userId) return;
    try {
      const tab = await queryActiveTab();
      const url = buildBookmarksPageUrl(userId);
      if (tab?.id) {
        chrome.tabs.update(tab.id, { url });
        return;
      }
      chrome.tabs.create({ url });
    } catch {
      // ignore tab navigation errors
    }
  };

  return { currentTagName, clearTag };
};
