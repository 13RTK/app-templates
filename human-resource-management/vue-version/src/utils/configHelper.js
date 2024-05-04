export function getConfig(key) {
  return import.meta.env[`VITE_${key}`];
}
