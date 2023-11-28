import { useMemo } from 'react';

import { range } from '@/utils';

import { useControllableState } from '../use-controllable';

export const DOTS = 'dots';

export interface UsePaginationParams {
  /** Page selected on initial render, defaults to 1 */
  initialPage?: number;

  /** Controlled active page number */
  page?: number;

  /** Total amount of pages */
  total: number;

  /** Siblings amount on left/right side of selected page, defaults to 1 */
  siblings?: number;

  /** Amount of elements visible on left/right edges, defaults to 1  */
  boundaries?: number;

  /** Callback fired after change of each page */
  onChange?: (page: number) => void;
}

/**
 * A hook that provides pagination functionality.
 *
 * @param total - The total number of items to paginate.
 * @param siblings - The number of siblings to show on either side of the active page.
 * @param boundaries - The number of boundary items to show on either side of the pagination range.
 * @param page - The current active page.
 * @param initialPage - The initial active page.
 * @param onChange - A callback function to be called when the active page changes.
 * @returns An object containing pagination range, active, setPage, next, previous, first, and last functions.
 */
export const usePagination = ({
  total,
  siblings = 1,
  boundaries = 1,
  page,
  initialPage = 1,
  onChange,
}: UsePaginationParams) => {
  const _total = Math.max(Math.trunc(total), 0);
  const [activePage, setActivePage] = useControllableState({
    value: page,
    onChange,
    defaultValue: initialPage,
  });

  const setPage = (pageNumber: number) => {
    if (pageNumber <= 0) {
      setActivePage(1);
    } else if (pageNumber > _total) {
      setActivePage(_total);
    } else {
      setActivePage(pageNumber);
    }
  };

  const next = () => setPage(activePage + 1);
  const previous = () => setPage(activePage - 1);
  const first = () => setPage(1);
  const last = () => setPage(_total);

  const paginationRange = useMemo((): (number | 'dots')[] => {
    const totalPageNumbers = siblings * 2 + 3 + boundaries * 2;
    if (totalPageNumbers >= _total) {
      return range(1, _total);
    }

    const leftSiblingIndex = Math.max(activePage - siblings, boundaries);
    const rightSiblingIndex = Math.min(activePage + siblings, _total - boundaries);

    const shouldShowLeftDots = leftSiblingIndex > boundaries + 2;
    const shouldShowRightDots = rightSiblingIndex < _total - (boundaries + 1);

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = siblings * 2 + boundaries + 2;
      return [...range(1, leftItemCount), DOTS, ...range(_total - (boundaries - 1), _total)];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = boundaries + 1 + 2 * siblings;
      return [...range(1, boundaries), DOTS, ...range(_total - rightItemCount, _total)];
    }

    return [
      ...range(1, boundaries),
      DOTS,
      ...range(leftSiblingIndex, rightSiblingIndex),
      DOTS,
      ...range(_total - boundaries + 1, _total),
    ];
  }, [siblings, boundaries, _total, activePage]);

  return {
    range: paginationRange,
    active: activePage,
    setPage,
    next,
    previous,
    first,
    last,
  };
};
