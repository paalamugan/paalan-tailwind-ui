/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Stack } from '@/layouts';

import { Label } from '../Label';
import { RadioInput } from './RadioInput';

const meta: Meta<typeof RadioInput> = {
  title: 'Components/RadioInput',
  component: RadioInput,
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof RadioInput>;

export const Default: Story = {
  args: {
    id: 'terms',
  },
};

export const WithLabel: Story = {
  args: {
    id: 'terms1',
    label: 'Accept terms and conditions',
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

export const Disabled: Story = {
  args: {
    ...WithLabel.args,
    id: 'terms2',
    disabled: true,
  },
};

export const SwapRight: Story = {
  args: {
    ...WithLabel.args,
    id: 'terms3',
    swapRight: true,
  },
};

export const Required: Story = {
  args: {
    ...WithLabel.args,
    id: 'terms4',
    required: true,
  },
};

export const WithSwapRightRequired: Story = {
  args: {
    ...Required.args,
    id: 'terms5',
    swapRight: true,
  },
};

export const WithMultipleRadios: Story = {
  render: () => {
    const [value, setValue] = React.useState<string | undefined>();
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    };
    return (
      <Stack gap="4">
        <Label text="Choose an option" />
        <Stack gap="2">
          <RadioInput
            id="option-1"
            name="option-1"
            value={'option-1'}
            label="Option 1"
            onChange={onChange}
            checked={value === 'option-1'}
          />
          <RadioInput
            id="option-2"
            name="option-2"
            value={'option-2'}
            label="Option 2"
            onChange={onChange}
            checked={value === 'option-2'}
          />
          <RadioInput
            id="option-2"
            name="option-3"
            value={'option-3'}
            label="Option 3"
            onChange={onChange}
            checked={value === 'option-3'}
          />
        </Stack>
      </Stack>
    );
  },
  args: {
    ...WithLabel.args,
    id: 'terms6',
    name: 'terms',
  },
};
