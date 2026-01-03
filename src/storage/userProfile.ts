const USER_PROFILE_KEY = 'pixivUserProfile';

export type UserProfile = {
  userId: string;
  name: string;
  image: string;
};

export const getUserProfile = () =>
  new Promise<UserProfile | null>((resolve, reject) => {
    if (!chrome.storage.session) {
      resolve(null);
      return;
    }
    chrome.storage.session.get(USER_PROFILE_KEY, (result) => {
      const err = chrome.runtime.lastError;
      if (err) {
        reject(new Error(err.message));
        return;
      }
      const value = result[USER_PROFILE_KEY];
      if (!value || typeof value !== 'object') {
        resolve(null);
        return;
      }
      resolve(value as UserProfile);
    });
  });

export const setUserProfile = (profile: UserProfile) =>
  new Promise<void>((resolve, reject) => {
    if (!chrome.storage.session) {
      resolve();
      return;
    }
    chrome.storage.session.set({ [USER_PROFILE_KEY]: profile }, () => {
      const err = chrome.runtime.lastError;
      if (err) {
        reject(new Error(err.message));
        return;
      }
      resolve();
    });
  });

export const clearUserProfile = () =>
  new Promise<void>((resolve, reject) => {
    if (!chrome.storage.session) {
      resolve();
      return;
    }
    chrome.storage.session.remove(USER_PROFILE_KEY, () => {
      const err = chrome.runtime.lastError;
      if (err) {
        reject(new Error(err.message));
        return;
      }
      resolve();
    });
  });
