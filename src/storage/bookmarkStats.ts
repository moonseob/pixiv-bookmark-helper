export const STORAGE_KEY = 'pixivBookmarkStats';

export interface BookmarkStats {
  userId: string;
  total: number;
  perPage: number;
  tagName: string;
  updatedAt: number;
}

type BookmarkStatsMap = Record<string, BookmarkStats>;

const buildKey = (userId: string, tagName: string) => `${userId}::${tagName}`;

const isBookmarkStats = (value: unknown): value is BookmarkStats => {
  if (!value || typeof value !== 'object') return false;
  return (
    'userId' in value &&
    'total' in value &&
    'perPage' in value &&
    'tagName' in value &&
    'updatedAt' in value
  );
};

export const setBookmarkStats = (stats: BookmarkStats) =>
  new Promise<void>((resolve, reject) => {
    if (!chrome.storage.session) {
      resolve();
      return;
    }
    chrome.storage.session.get(STORAGE_KEY, (result) => {
      const err = chrome.runtime.lastError;
      if (err) {
        reject(new Error(err.message));
        return;
      }
      const existing = result[STORAGE_KEY];
      const nextMap: BookmarkStatsMap = isBookmarkStats(existing)
        ? { [buildKey(existing.userId, existing.tagName)]: existing }
        : ((existing as BookmarkStatsMap) ?? {});
      nextMap[buildKey(stats.userId, stats.tagName)] = stats;
      chrome.storage.session.set({ [STORAGE_KEY]: nextMap }, () => {
        const err2 = chrome.runtime.lastError;
        if (err2) {
          reject(new Error(err2.message));
          return;
        }
        resolve();
      });
    });
  });

export const getBookmarkStats = (userId: string, tagName: string) =>
  new Promise<BookmarkStats | null>((resolve, reject) => {
    if (!chrome.storage.session) {
      resolve(null);
      return;
    }
    chrome.storage.session.get(STORAGE_KEY, (result) => {
      const err = chrome.runtime.lastError;
      if (err) {
        reject(new Error(err.message));
        return;
      }
      const existing = result[STORAGE_KEY];
      if (!existing || typeof existing !== 'object') {
        resolve(null);
        return;
      }
      if (isBookmarkStats(existing)) {
        const legacy = existing;
        resolve(
          legacy.userId === userId && legacy.tagName === tagName
            ? legacy
            : null,
        );
        return;
      }
      const map = existing as BookmarkStatsMap;
      resolve(map[buildKey(userId, tagName)] ?? null);
    });
  });
