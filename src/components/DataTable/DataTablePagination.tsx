import { useEffect, useMemo } from 'react';

import type { Table } from '@tanstack/react-table';
import type { TablePaginationOption } from './types';

import { Button } from '@/components/Button';
import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValue } from '@/components/Select';
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@/icons/custom';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  pagination?: TablePaginationOption;
}

export function DataTablePagination<TData>({ table, pagination }: DataTablePaginationProps<TData>) {
  const currentPage = pagination?.currentPage ?? 1;
  const sizes = useMemo(() => pagination?.sizes ?? [10, 20, 30, 40, 50], [pagination]);

  const pageSize = useMemo(() => {
    if (!pagination?.pageSize) {
      return sizes[0];
    }
    return sizes.includes(pagination.pageSize) ? pagination?.pageSize : sizes[0];
  }, [pagination, sizes]);

  useEffect(() => {
    table.setPageSize(pageSize);
  }, [pageSize, table]);

  useEffect(() => {
    table.setPageIndex(currentPage - 1);
  }, [currentPage, table]);

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <SelectRoot
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {sizes.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
