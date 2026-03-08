export function getConfig(key: string) {
  return import.meta.env[`VITE_${key}`];
}
