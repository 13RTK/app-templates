export function getItem(key: string) {
  return JSON.parse(localStorage.getItem(key) || '{}');
}

export function removeItem(key: string) {
  localStorage.removeItem(key);
}
