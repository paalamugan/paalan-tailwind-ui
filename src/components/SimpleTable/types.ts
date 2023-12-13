import type { ReactNode } from 'react';
import type { TableProps } from '../Table';

export interface SimpleTableProps extends TableProps {
  /**
   * An array of objects that define the table headers.
   */
  columns: SimpleTableColumn[];
  /**
   * An array of objects that define the table rows.
   */
  rows: Record<string, unknown>[];
  /**
   * The primary key of the table rows.
   */
  primaryKey: string;
  /**
   * The table caption.
   */
  caption?: React.ReactNode;
  /**
   * className is the class name of the table.
   */
  className?: string;
  /**
   * className is the class name of the table row. it is apply for all rows.
   */
  rowClassName?: string;
  /**
   * columnClassName is the class name of the table header. it is apply for all headers.
   */
  columnClassName?: string;
}

export interface SimpleTableColumn {
  /**
   * accessorKey is the key of the row object.
   */
  accessorKey: string;
  /**
   * The header content.
   */
  title: ReactNode;
  /**
   * className is the class name of the table header.
   */
  className?: string;
  /**
   * rowClassName is the class name of the table row.
   */
  rowClassName?: string;
  /**
   *
   * @param props is the value of the row object and the column object.
   * @returns rowRender returns the row content.
   */
  render?: (props: {
    value: unknown;
    column: SimpleTableColumn;
    row: Record<string, unknown>;
    index: number;
  }) => ReactNode;
}
