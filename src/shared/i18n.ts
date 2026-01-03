export const t = (key: string, substitutions?: string | string[]) => {
  if (typeof chrome !== 'undefined' && chrome.i18n?.getMessage) {
    const message = chrome.i18n.getMessage(key, substitutions);
    return message || key;
  }
  return key;
};
