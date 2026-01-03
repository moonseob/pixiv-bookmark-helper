const SESSION_USER_KEY = 'pixivSessionUser';

export interface SessionUser {
  userId: string;
  fetchedAt: number;
}

export const getSessionUser = () =>
  new Promise<SessionUser | null>((resolve, reject) => {
    if (!chrome.storage.session) {
      resolve(null);
      return;
    }
    chrome.storage.session.get(SESSION_USER_KEY, (result) => {
      const err = chrome.runtime.lastError;
      if (err) {
        reject(new Error(err.message));
        return;
      }
      const value = result[SESSION_USER_KEY];
      if (!value || typeof value !== 'object') {
        resolve(null);
        return;
      }
      resolve(value as SessionUser);
    });
  });

export const setSessionUser = (userId: string, fetchedAt = Date.now()) =>
  new Promise<void>((resolve, reject) => {
    if (!chrome.storage.session) {
      resolve();
      return;
    }
    chrome.storage.session.set(
      { [SESSION_USER_KEY]: { userId, fetchedAt } satisfies SessionUser },
      () => {
        const err = chrome.runtime.lastError;
        if (err) {
          reject(new Error(err.message));
          return;
        }
        resolve();
      },
    );
  });

export const clearSessionUser = () =>
  new Promise<void>((resolve, reject) => {
    if (!chrome.storage.session) {
      resolve();
      return;
    }
    chrome.storage.session.remove(SESSION_USER_KEY, () => {
      const err = chrome.runtime.lastError;
      if (err) {
        reject(new Error(err.message));
        return;
      }
      resolve();
    });
  });
