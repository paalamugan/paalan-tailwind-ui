import React from 'react';

import type { SimpleTableColumn } from './types';

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../Table';

interface SimpleTableProps extends React.ComponentPropsWithoutRef<typeof Table> {
  rows: Record<string, unknown>[];
  columns: SimpleTableColumn[];
  primaryKey: string;
  caption?: string;
}
const SimpleTable = React.forwardRef<React.ElementRef<typeof Table>, SimpleTableProps>(
  ({ rows, columns, caption, primaryKey, ...props }, ref) => {
    return (
      <Table ref={ref} {...props}>
        {caption && <TableCaption>{caption}</TableCaption>}
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.accessorKey} className={column.className}>
                {column.title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={`${row[primaryKey] ? row[primaryKey] : index}`}>
              {columns.map((column) => (
                <TableCell key={column.accessorKey} className={column.rowClassName}>
                  <>
                    {column.render
                      ? column.render({ row, column, value: row[column.accessorKey] })
                      : row[column.accessorKey] || '-'}
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

export { SimpleTable };
