import type { Meta, StoryObj } from '@storybook/react';

import { DEFAULT_PAGE_SIZE_OPTIONS, Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    total: 100,
    siblings: 1,
    boundaries: 1,
    initialPage: 1,
    pageSize: 10,
    showTotalResults: true,
    showOnlyNextAndPrevious: false,
    showPageSizeOptions: true,
  },
};

export const WithCustomInitialPage: Story = {
  args: {
    ...Default.args,
    initialPage: 5,
  },
};

export const WithoutTotalResults: Story = {
  args: {
    ...Default.args,
    showTotalResults: false,
  },
};

export const OnlyNextAndPrevious: Story = {
  args: {
    ...Default.args,
    showOnlyNextAndPrevious: true,
  },
};

export const WithoutPageSizeOptions: Story = {
  args: {
    ...Default.args,
    showPageSizeOptions: false,
  },
};

export const WithCustomPageSizeOptions: Story = {
  args: {
    ...Default.args,
    pageSizeOptions: [10, 40, 50, 100],
  },
};

export const WithCustomPageSize: Story = {
  args: {
    ...Default.args,
    pageSize: DEFAULT_PAGE_SIZE_OPTIONS[3],
  },
};

export const WithCustomTotal: Story = {
  args: {
    ...Default.args,
    total: 1000,
  },
};

export const WithCustomPage: Story = {
  args: {
    ...Default.args,
    page: 5,
  },
};

export const WithCustomSiblings: Story = {
  args: {
    ...Default.args,
    siblings: 2,
  },
};

export const WithCustomBoundaries: Story = {
  args: {
    ...Default.args,
    boundaries: 2,
  },
};

export const WithCustomPageSizeText: Story = {
  args: {
    ...Default.args,
    pageSizeText: 'results per page',
  },
};
