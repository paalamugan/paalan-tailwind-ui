interface GetRelativePositionInput {
  /** Axis on which to scroll */
  axis: 'x' | 'y';

  /** Element to scroll to */
  target: HTMLElement | null;

  /** Parent element to scroll inside */
  parent?: HTMLElement | null;

  /** Alignment of target element */
  alignment?: 'start' | 'center' | 'end';

  /** Offset in px */
  offset?: number;

  /** Whether parent is list */
  isList?: boolean;
}

export const getRelativePosition = ({
  axis,
  target,
  parent,
  alignment,
  offset = 0,
  isList,
}: GetRelativePositionInput): number => {
  if (!target || (!parent && typeof document === 'undefined')) {
    return 0;
  }
  const isCustomParent = !!parent;
  const parentElement = parent || document.body;
  const parentPosition = parentElement.getBoundingClientRect();
  const targetPosition = target.getBoundingClientRect();

  const getDiff = (property: 'top' | 'left'): number => targetPosition[property] - parentPosition[property];

  if (axis === 'y') {
    const diff = getDiff('top');

    if (diff === 0) return 0;

    if (alignment === 'start') {
      const distance = diff - offset;
      const shouldScroll = distance <= targetPosition.height * (isList ? 0 : 1) || !isList;

      return shouldScroll ? distance : 0;
    }

    const parentHeight = isCustomParent ? parentPosition.height : window.innerHeight;

    if (alignment === 'end') {
      const distance = diff + offset - parentHeight + targetPosition.height;
      const shouldScroll = distance >= -targetPosition.height * (isList ? 0 : 1) || !isList;

      return shouldScroll ? distance : 0;
    }

    if (alignment === 'center') {
      return diff - parentHeight / 2 + targetPosition.height / 2;
    }

    return 0;
  }

  if (axis === 'x') {
    const diff = getDiff('left');

    if (diff === 0) return 0;

    if (alignment === 'start') {
      const distance = diff - offset;
      const shouldScroll = distance <= targetPosition.width || !isList;

      return shouldScroll ? distance : 0;
    }

    const parentWidth = isCustomParent ? parentPosition.width : window.innerWidth;

    if (alignment === 'end') {
      const distance = diff + offset - parentWidth + targetPosition.width;
      const shouldScroll = distance >= -targetPosition.width || !isList;

      return shouldScroll ? distance : 0;
    }

    if (alignment === 'center') {
      return diff - parentWidth / 2 + targetPosition.width / 2;
    }

    return 0;
  }

  return 0;
};
