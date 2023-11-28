export const injectStyles = (tag: HTMLStyleElement, css: string) => {
  if (tag.style.cssText) {
    tag.style.cssText = css;
  } else {
    tag.appendChild(document.createTextNode(css));
  }
};
