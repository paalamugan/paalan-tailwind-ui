import { useState } from 'react';

import type { ColumnDef, ColumnFiltersState, SortingState, VisibilityState } from '@tanstack/react-table';
import type { TableFacetFilterColumn, TablePaginationOption, TableSearchFilterColumn } from './types';

import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../Table';
import { getSelectColumn } from './constants';
import { DataTablePagination } from './DataTablePagination';
import { DataTableToolbar } from './DataTableToolbar';

interface DataTableProps<TData, TValue> {
  /**
   * provide the columns to render in the table
   */
  columns: ColumnDef<TData, TValue>[];
  /**
   * provide the data to render in the table
   */
  data: TData[];
  /**
   * enable the selectable checkbox input in the table header
   */
  enableSelectAbleTable?: boolean;
  /**
   * provide the column accessorKey value to search the table
   */
  search?: TableSearchFilterColumn;
  /**
   * provide the column accessorKey value to filter the table
   */
  TableFacetFilterColumns?: TableFacetFilterColumn[];
  /**
   * show the table toolbar
   */
  showTableConfigure?: boolean;
  /**
   * provide the pagination options
   */
  pagination?: TablePaginationOption;
}

/**
 * The DataTable component is used to display data in a tabular format.
 * It is a wrapper around the react-table component.
 */
export const DataTable = <TData, TValue>({
  columns,
  data,
  enableSelectAbleTable,
  search,
  TableFacetFilterColumns,
  showTableConfigure,
  pagination,
}: DataTableProps<TData, TValue>) => {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const tableColumns = enableSelectAbleTable ? [getSelectColumn<TData>(), ...columns] : columns;
  const paginationEnabled = pagination?.enabled ?? false;

  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="space-y-4">
      <DataTableToolbar
        table={table}
        search={search}
        TableFacetFilterColumns={TableFacetFilterColumns}
        showTableConfigure={showTableConfigure}
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {paginationEnabled && <DataTablePagination table={table} pagination={pagination} />}
    </div>
  );
};
