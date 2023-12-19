import type { Meta, StoryObj } from '@storybook/react';

import { add } from 'date-fns';

import { DateRangePicker } from './DateRangePicker';

const meta: Meta<typeof DateRangePicker> = {
  title: 'Components/DateRangePicker',
  component: DateRangePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    className: {
      table: {
        disable: true,
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof DateRangePicker>;

export const Basic: Story = {
  args: {},
};

export const WithValue: Story = {
  args: {
    dateRange: {
      from: new Date(),
      to: add(new Date(), { days: 7 }),
    },
  },
};

export const WithCustomPlaceholder: Story = {
  args: {
    ...WithValue.args,
    placeholder: 'Custom placeholder',
  },
};

export const WithLabel: Story = {
  args: {
    ...WithValue.args,
    label: 'Select a date',
  },
};

export const WithInvalidWithoutMessage: Story = {
  args: {
    ...WithLabel.args,
    isInvalid: true,
  },
};

export const WithErrorMessage: Story = {
  args: { ...WithInvalidWithoutMessage.args, errorMessage: 'This field is required.' },
};

export const WithCustomDateFormat: Story = {
  args: {
    ...WithValue.args,
    dateFormat: 'dd/MM/yyyy',
  },
};

export const WithRequired: Story = {
  args: {
    ...WithLabel.args,
    required: true,
  },
};

export const WithInvalid: Story = {
  args: {
    ...WithRequired.args,
    isInvalid: true,
  },
};
