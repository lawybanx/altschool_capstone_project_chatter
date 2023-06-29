export const saveToLocalStorage = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

export const removeFromLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};

export const getItemFromLocalStorage = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};
