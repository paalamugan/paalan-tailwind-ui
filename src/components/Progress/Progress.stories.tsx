import { useEffect, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { COLOR_VARIANTS } from '@/constants';

import { Progress } from './Progress';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: {
        options: COLOR_VARIANTS,
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Progress>;

export const Primary: Story = {
  args: {
    value: 33,
    variant: 'primary',
  },
};
export const Secondary: Story = {
  args: {
    value: 33,
    variant: 'secondary',
  },
};

export const Info: Story = {
  args: {
    value: 33,
    variant: 'info',
  },
};

export const Success: Story = {
  args: {
    value: 33,
    variant: 'success',
  },
};
export const Warning: Story = {
  args: {
    value: 33,
    variant: 'warning',
  },
};
export const Danger: Story = {
  args: {
    value: 33,
    variant: 'danger',
  },
};
export const Dark: Story = {
  args: {
    value: 33,
    variant: 'dark',
  },
};

const ProgressComponent: Story['render'] = ({ value }) => {
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    setProgress(value || 10);
  }, [value]);

  useEffect(() => {
    if (progress >= 100) return;
    const timer = setTimeout(() => setProgress((progress) => progress + 10), 500);
    return () => clearTimeout(timer);
  }, [progress]);

  return <Progress value={progress} className="w-full" />;
};

export const ProgressDemo: Story = {
  render: ProgressComponent,
  args: {
    value: 10,
    variant: 'primary',
  },
};
