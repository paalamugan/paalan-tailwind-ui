import type { Meta, StoryObj } from '@storybook/react';

import { CheckCircleIcon } from '@heroicons/react/24/solid';

import { toast, Toaster } from '.';
import { Button } from '../Button';

const meta: Meta<typeof Toaster> = {
  title: 'components/Toast',
  component: Toaster,
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Toaster>;

export const Simple: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() => {
        toast('Your message has been sent.');
      }}
    >
      Simple Toast
    </Button>
  ),
};

export const SimpleWithDescription: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() => {
        toast('Your message has been sent.', {
          description: 'We will get back to you as soon as possible.',
        });
      }}
    >
      Simple Description Toast
    </Button>
  ),
};

export const SimpleWithAction: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() => {
        toast('Your message has been sent.', {
          description: 'We will get back to you as soon as possible.',
          action: {
            label: 'Undo',
            onClick: () => {
              toast('Your message has been undone.');
            },
          },
        });
      }}
    >
      Simple Action Toast
    </Button>
  ),
};
export const SimpleWithActionAndCancel: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() => {
        toast('Your message has been sent.', {
          description: 'We will get back to you as soon as possible.',
          action: {
            label: 'Undo',
            onClick: () => {
              toast('Your message has been undone.');
            },
          },
          cancel: {
            label: 'Cancel',
            onClick: () => {
              toast('Your message has been canceled.');
            },
          },
        });
      }}
    >
      Simple Action and Cancel Toast
    </Button>
  ),
};

export const SimpleWithIcon: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() => {
        toast('Your message has been sent.', {
          description: 'We will get back to you as soon as possible.',
          icon: <CheckCircleIcon className="h-5 w-5" />,
        });
      }}
    >
      Simple Icon Toast
    </Button>
  ),
};

export const Message: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() => {
        toast.message('Your message has been sent.');
      }}
    >
      Message Toast
    </Button>
  ),
};

export const Success: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() => {
        toast.success('Your message has been sent.');
      }}
    >
      Success Toast
    </Button>
  ),
};

export const ErrorToast: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() => {
        toast.error('Your message is not sent.');
      }}
    >
      Error Toast
    </Button>
  ),
};

export const Warning: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() => {
        toast.warning('Your message has been sent.');
      }}
    >
      Warning Toast
    </Button>
  ),
};

export const Info: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() => {
        toast.info('Your message has been sent.');
      }}
    >
      Info Toast
    </Button>
  ),
};

export const Loading: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() => {
        toast.loading('Loading...');
      }}
    >
      Loading Toast
    </Button>
  ),
};

export const Custom: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() => {
        toast(<div>A custom toast with default styling</div>);
      }}
    >
      Custom Toast
    </Button>
  ),
};

export const PromiseWithSuccess: Story = {
  render: () => {
    const promise = () =>
      new Promise<{ name: string }>((resolve) => setTimeout(() => resolve({ name: 'Promise' }), 2000));
    return (
      <Button
        variant="outline"
        onClick={() => {
          toast.promise(promise, {
            loading: 'Loading...',
            success: (data) => {
              return `${data.name} toast has been added`;
            },
            error: 'Error!',
          });
        }}
      >
        Promise Success Toast
      </Button>
    );
  },
};

export const PromiseWithError: Story = {
  render: () => {
    const promise = () => new Promise((_, reject) => setTimeout(() => reject(new Error('Promise Error')), 2000));
    return (
      <Button
        variant="outline"
        onClick={() => {
          toast.promise(promise, {
            loading: 'Loading...',
            success: 'Success!',
            error: (err) => (err as Error).message,
          });
        }}
      >
        Promise Error Toast
      </Button>
    );
  },
};

export const ShowCustomToast: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() => {
        toast.show('Show Custom Toast', {
          description: 'This is a custom Headless toast with custom styling',
          duration: 5000,
        });
      }}
    >
      Show Custom Toast
    </Button>
  ),
};

export const CustomToast: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() => {
        toast.custom((id) => (
          <div className="toast-headless">
            <p className="toast-headless-title">Event Created</p>
            <p className="toast-headless-description">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <button className="toast-headless-close" onClick={() => toast.dismiss(id)}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <path d="M2.96967 2.96967C3.26256 2.67678 3.73744 2.67678 4.03033 2.96967L8 6.939L11.9697 2.96967C12.2626 2.67678 12.7374 2.67678 13.0303 2.96967C13.3232 3.26256 13.3232 3.73744 13.0303 4.03033L9.061 8L13.0303 11.9697C13.2966 12.2359 13.3208 12.6526 13.1029 12.9462L13.0303 13.0303C12.7374 13.3232 12.2626 13.3232 11.9697 13.0303L8 9.061L4.03033 13.0303C3.73744 13.3232 3.26256 13.3232 2.96967 13.0303C2.67678 12.7374 2.67678 12.2626 2.96967 11.9697L6.939 8L2.96967 4.03033C2.7034 3.76406 2.6792 3.3474 2.89705 3.05379L2.96967 2.96967Z"></path>
              </svg>
            </button>
          </div>
        ));
      }}
    >
      Custom Toast
    </Button>
  ),
};
