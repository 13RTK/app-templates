export function generateFilename(originalName) {
  return `${Date.now()}-${originalName}`;
}
