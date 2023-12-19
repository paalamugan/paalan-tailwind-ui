import type { Meta, StoryObj } from '@storybook/react';
import type { Task } from './data';

import { columns } from './columns';
import { priorities, statuses, tasks } from './data';
import { DataTable } from './DataTable';

const meta: Meta<typeof DataTable<Task, unknown>> = {
  title: 'Components/DataTable',
  component: DataTable,
  args: {
    columns: columns,
    data: tasks,
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof DataTable<Task, unknown>>;

export const Basic: Story = {
  args: {},
};

export const Selectable: Story = {
  args: {
    enableSelectAbleTable: true,
  },
};

export const Pagination: Story = {
  args: {
    ...Selectable.args,
    pagination: {
      enabled: true,
      pageSize: 10,
    },
  },
};
export const Toolbar: Story = {
  args: {
    showTableConfigure: true,
    search: {
      accessorKey: 'id',
      placeholder: 'Search by task...',
    },
    TableFacetFilterColumns: [
      {
        accessorKey: 'status',
        title: 'Status',
        options: statuses,
      },
      {
        accessorKey: 'priority',
        title: 'Priority',
        options: priorities,
      },
    ],
  },
};

export const FilterSearch: Story = {
  args: {
    search: {
      accessorKey: 'id',
      placeholder: 'Search by task...',
    },
  },
};

export const ToolbarWithPagination: Story = {
  args: {
    showTableConfigure: true,
    search: {
      accessorKey: 'id',
      placeholder: 'Search by task...',
    },
    TableFacetFilterColumns: [
      {
        accessorKey: 'status',
        title: 'Status',
        options: statuses,
      },
      {
        accessorKey: 'priority',
        title: 'Priority',
        options: priorities,
      },
    ],
    pagination: {
      enabled: true,
      pageSize: 10,
    },
  },
};

export const FacetFilter: Story = {
  args: {
    TableFacetFilterColumns: [
      {
        accessorKey: 'status',
        title: 'Status',
        options: statuses,
      },
      {
        accessorKey: 'priority',
        title: 'Priority',
        options: priorities,
      },
    ],
  },
};

export const SearchWithFacetFilter: Story = {
  args: {
    search: {
      accessorKey: 'id',
      placeholder: 'Search by task...',
    },
    TableFacetFilterColumns: [
      {
        accessorKey: 'status',
        title: 'Status',
        options: statuses,
      },
      {
        accessorKey: 'priority',
        title: 'Priority',
        options: priorities,
      },
    ],
  },
};
