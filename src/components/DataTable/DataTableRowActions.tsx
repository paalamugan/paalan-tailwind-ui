import { Fragment } from 'react';

import type { Row } from '@tanstack/react-table';
import type z from 'zod';
import type { TableActionItem } from './types';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/DropdownMenu';
import { DotsHorizontalIcon } from '@/icons/icons';

import { Button } from '../Button';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  rowSchema: z.AnyZodObject;
  actionItems: TableActionItem[];
}

export const DataTableRowActions = <TData,>({ row, rowSchema, actionItems }: DataTableRowActionsProps<TData>) => {
  const rowData = rowSchema.parse(row.original);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {actionItems.map((actionItem) => (
          <Fragment key={actionItem.label}>
            {!actionItem.subLabels?.length ? (
              <DropdownMenuItem onClick={(e) => actionItem.onClick?.(actionItem.value, e)}>
                {actionItem.label}
                {actionItem.icon && <DropdownMenuShortcut>{<actionItem.icon />}</DropdownMenuShortcut>}
              </DropdownMenuItem>
            ) : (
              <Fragment>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>{actionItem.label}</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuRadioGroup value={rowData.label}>
                      {actionItem.subLabels?.map((label) => (
                        <DropdownMenuRadioItem key={label.value} value={label.value}>
                          {label.icon && <label.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
                          {label.label}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
              </Fragment>
            )}
          </Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
