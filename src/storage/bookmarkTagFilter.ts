const STORAGE_KEY = 'pixivBookmarkTagFilter';

export type BookmarkTagFilter = {
  tagName: string;
  updatedAt: number;
};

const defaultState: BookmarkTagFilter = {
  tagName: '',
  updatedAt: 0,
};

export const getBookmarkTagFilter = () =>
  new Promise<BookmarkTagFilter>((resolve, reject) => {
    if (!chrome.storage.session) {
      resolve(defaultState);
      return;
    }
    chrome.storage.session.get(STORAGE_KEY, (result) => {
      const err = chrome.runtime.lastError;
      if (err) {
        reject(new Error(err.message));
        return;
      }
      const value = result[STORAGE_KEY];
      if (!value || typeof value !== 'object') {
        resolve(defaultState);
        return;
      }
      const data = value as BookmarkTagFilter;
      resolve({
        tagName: data.tagName ?? '',
        updatedAt: data.updatedAt ?? 0,
      });
    });
  });

export const setBookmarkTagFilter = (tagName: string) =>
  new Promise<void>((resolve, reject) => {
    if (!chrome.storage.session) {
      resolve();
      return;
    }
    const nextState: BookmarkTagFilter = {
      tagName,
      updatedAt: Date.now(),
    };
    chrome.storage.session.set({ [STORAGE_KEY]: nextState }, () => {
      const err = chrome.runtime.lastError;
      if (err) {
        reject(new Error(err.message));
        return;
      }
      resolve();
    });
  });
