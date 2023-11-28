export function randomId() {
  return `random-${Math.random().toString(36).slice(2, 11)}`;
}
