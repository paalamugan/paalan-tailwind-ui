interface ScrollParam {
  axis: 'x' | 'y';
  parent?: HTMLElement | null;
  distance: number;
}
export const setScrollParam = ({ axis, parent, distance }: ScrollParam) => {
  if (!parent && typeof document === 'undefined') {
    return;
  }

  const method = axis === 'y' ? 'scrollTop' : 'scrollLeft';

  if (parent) {
    parent[method] = distance;
  } else {
    const { body, documentElement } = document;

    // https://www.w3schools.com/jsref/prop_element_scrolltop.asp
    body[method] = distance;
    documentElement[method] = distance;
  }
};
