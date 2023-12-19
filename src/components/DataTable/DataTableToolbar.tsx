import type { Table } from '@tanstack/react-table';
import type { TableFacetFilterColumn, TableSearchFilterColumn } from './types';

import { Cross2Icon } from '@/icons';

import { Button } from '../Button';
import { Input } from '../Input';
import { DataTableFacetedFilter } from './DataTableFacetedFilter';
import { DataTableViewOptions } from './DataTableViewOptions';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  search?: TableSearchFilterColumn;
  TableFacetFilterColumns?: TableFacetFilterColumn[];
  showTableConfigure?: boolean;
}

export function DataTableToolbar<TData>({
  table,
  search,
  TableFacetFilterColumns,
  showTableConfigure,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {search && (
          <Input
            placeholder={search.placeholder || `Search by ${search.accessorKey}...`}
            value={(table.getColumn(search.accessorKey)?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn(search.accessorKey)?.setFilterValue(event.target.value)}
            className="h-8 w-[150px] lg:w-[250px]"
          />
        )}
        {TableFacetFilterColumns?.map(
          ({ accessorKey, ...column }) =>
            table.getColumn(accessorKey) && (
              <DataTableFacetedFilter key={accessorKey} column={table.getColumn(accessorKey)} {...column} />
            ),
        )}
        {isFiltered && (
          <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {showTableConfigure && <DataTableViewOptions table={table} />}
    </div>
  );
}
