import React, { useEffect, useState } from 'react';

import type { UsePaginationParams } from '@/hooks/use-pagination';
import type { BoxProps } from '@/layouts';
import type { ReactNode } from 'react';

import { usePagination } from '@/hooks/use-pagination';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@/icons';
import { Box, Strong, Text } from '@/layouts';
import { cn } from '@/utils';

import { IconButton } from '../IconButton';
import { NextAndPrevPagination, PaginationSizeOption } from './components';

export const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 30, 40, 50];

export interface PaginationProps extends BoxProps, Omit<UsePaginationParams, 'onChange'> {
  /**
   * The total number of items.
   */
  total: number;
  /**
   * The total number of items per page.
   * @default 10
   */
  pageSize?: number;
  /**
   *
   * @param pageSize page size number
   * @returns void
   */
  onPageSizeChange?: (pageSize: number) => void;
  /**
   * pageSizeOptions for the pagination
   */
  pageSizeOptions?: number[];
  /**
   * pageSizeText for the pagination
   * @default "items per page"
   */
  pageSizeText?: ReactNode;
  /**
   * showPageSizeOptions for the pagination
   * @default false
   */
  showPageSizeOptions?: boolean;
  /**
   *
   * @param page page number
   * @returns void
   */
  onPageChange?: (page: number) => void;
  /**
   * hide the total result description or not
   */
  showTotalResults?: boolean;
  /**
   * show only the next and previous buttons or not
   */
  showOnlyNextAndPrevious?: boolean;
  /**
   * Additional class names to apply to the pagination.
   */
  className?: string;
}

/**
 * Pagination component.
 */
export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      total,
      siblings,
      boundaries,
      page,
      initialPage,
      onPageChange,
      showTotalResults = false,
      showOnlyNextAndPrevious,
      pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
      pageSizeText,
      showPageSizeOptions = false,
      className,
      pageSize: selectedPageSize = DEFAULT_PAGE_SIZE_OPTIONS[0],
      onPageSizeChange,
      ...props
    },
    ref,
  ) => {
    const [pageSize, setPageSize] = useState(selectedPageSize);

    useEffect(() => {
      setPageSize(selectedPageSize);
    }, [selectedPageSize]);

    const totalPages = Math.ceil(total / pageSize);

    const pagination = usePagination({
      siblings,
      boundaries,
      page,
      initialPage,
      total: totalPages,
      onChange: onPageChange,
    });

    const currentPageCount = Math.ceil(total % pageSize);

    const fromCount = (pagination.active - 1) * pageSize + 1;
    const isFirsPage = pagination.active === 1;
    const isLastPage = pagination.active === totalPages;
    const toCount =
      isLastPage && currentPageCount !== 0 ? fromCount + currentPageCount - 1 : pagination.active * pageSize;

    return (
      <Box
        className={cn(
          'flex items-center justify-between gap-2 px-4 py-3 md:px-6',
          {
            'justify-center': !showTotalResults && !showPageSizeOptions,
          },
          className,
        )}
        {...props}
        ref={ref}
      >
        {showTotalResults && (
          <Box className="hidden md:inline-flex">
            <Text className="text-sm">
              Showing <Strong>{fromCount}</Strong> to <Strong>{toCount}</Strong> of <Strong>{total}</Strong> results
            </Text>
          </Box>
        )}

        {showOnlyNextAndPrevious ? (
          <NextAndPrevPagination
            onNext={pagination.next}
            onPrev={pagination.previous}
            isDisabledPrev={isFirsPage}
            isDisabledNext={isLastPage}
          />
        ) : (
          <Box className="relative z-0 inline-flex -space-x-px rounded-none shadow-sm" aria-label="Pagination">
            <IconButton
              onClick={() => pagination.first()}
              disabled={isFirsPage}
              outline
              className=" text-gray-700 hover:bg-gray-50"
              rounded="none"
            >
              <span className="sr-only">Next</span>
              <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
            </IconButton>
            <IconButton
              onClick={() => pagination.previous()}
              disabled={isFirsPage}
              outline
              className=" text-gray-700 hover:bg-gray-50"
              rounded="none"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </IconButton>
            {pagination.range.map((number) => (
              <IconButton
                key={number}
                outline
                rounded="none"
                onClick={() => {
                  if (number === pagination.active) return;
                  if (number === 'dots') return;
                  pagination.setPage(number);
                }}
                className={cn('hidden w-10 md:inline-flex', {
                  'border-transparent bg-primary text-primary-foreground': pagination.active === number,
                  ' text-gray-700 hover:bg-gray-50': pagination.active !== number,
                  'cursor-not-allowed hover:bg-transparent': number === 'dots',
                })}
              >
                {number === 'dots' ? '...' : number}
              </IconButton>
            ))}
            <IconButton
              onClick={() => pagination.next()}
              disabled={isLastPage}
              rounded="none"
              outline
              className=" text-gray-700 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </IconButton>
            <IconButton
              onClick={() => pagination.last()}
              disabled={isLastPage}
              rounded="none"
              outline
              className=" text-gray-700 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
            </IconButton>
          </Box>
        )}
        {showPageSizeOptions && (
          <PaginationSizeOption
            pageSize={pageSize}
            setPageSize={(value) => {
              setPageSize(value);
              onPageSizeChange?.(value);
            }}
            isDisabled={!total}
            options={pageSizeOptions}
            text={pageSizeText}
          />
        )}
      </Box>
    );
  },
);
