import type { SimpleTableProps } from './types';

import { cn, forwardRef } from '@/utils';

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../Table';

export const SimpleTable = forwardRef<SimpleTableProps, 'table'>(
  ({ caption, primaryKey, columns, rows, rowClassName, columnClassName, ...props }, ref) => {
    return (
      <Table ref={ref} {...props}>
        {caption && <TableCaption>{caption}</TableCaption>}
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={column.accessorKey}
                id={column.accessorKey}
                className={cn(columnClassName, column.className)}
              >
                {column.title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={`${row[primaryKey] ? row[primaryKey] : index}`}>
              {columns.map((column) => (
                <TableCell key={column.accessorKey} className={cn(rowClassName, column.rowClassName)}>
                  <>
                    {column.render
                      ? column.render({ value: row[column.accessorKey], row, column, index })
                      : row[column.accessorKey] ?? '-'}
                  </>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
);
SimpleTable.displayName = 'SimpleTable';
