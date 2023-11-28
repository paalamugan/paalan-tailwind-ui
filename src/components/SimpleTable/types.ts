import type { ReactNode } from 'react';

export interface SimpleTableColumn {
  title: string;
  accessorKey: string;
  className?: string;
  rowClassName?: string;
  render?: (props: { value: unknown; column: SimpleTableColumn; row: Record<string, unknown> }) => ReactNode;
}
