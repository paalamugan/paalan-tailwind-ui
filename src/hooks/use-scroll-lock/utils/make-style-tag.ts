export function makeStyleTag() {
  const tag = document.createElement('style');
  tag.setAttribute('type', 'text/css');
  tag.setAttribute('paalan-scroll-lock', '');

  return tag;
}
