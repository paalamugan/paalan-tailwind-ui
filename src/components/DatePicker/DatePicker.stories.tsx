import type { Meta, StoryObj } from '@storybook/react';

import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    date: {
      control: {
        type: 'date',
      },
    },
    className: {
      table: {
        disable: true,
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Basic: Story = {
  args: {},
};

export const WithValue: Story = {
  args: {
    date: new Date(),
  },
};

export const WithCustomPlaceholder: Story = {
  args: {
    placeholder: 'Select a date',
  },
};

export const WithLabel: Story = {
  args: {
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
    dateFormat: 'MM/dd/yyyy',
  },
};

export const WithRequired: Story = {
  args: {
    ...WithValue.args,
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

export const WithDatePresets: Story = {
  args: {
    presets: [
      {
        label: 'Yesterday',
        value: -1,
      },
      {
        label: 'Today',
        value: 0,
      },
      {
        label: 'Tomorrow',
        value: 1,
      },
      {
        label: 'In 7 days',
        value: 7,
      },
      {
        label: 'In a month',
        value: 30,
      },
      {
        label: 'Last 7 days',
        value: -7,
      },
    ],
  },
};
