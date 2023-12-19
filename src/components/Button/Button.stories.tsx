import type { Meta, StoryObj } from '@storybook/react';

import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';

import { ALL_COLOR_VARIANTS } from '@/constants/colors';
import { EnvelopeIcon } from '@/icons';
import { Flex, Grid, Heading } from '@/layouts';

import { Button } from './Button';
import { BUTTON_ROUNDED, BUTTON_SIZE, BUTTON_VARIANTS } from './constants';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      description: 'Whether or not the button is disabled',
      control: {
        type: 'boolean',
      },
    },
    asChild: {
      description: 'Render the component as a child of the trigger.',
      table: {
        disable: true,
      },
    },
    size: {
      description: 'The size of the button.',
      control: {
        type: 'select',
      },
      options: Object.keys(BUTTON_SIZE),
      defaultValue: 'md',
    },
    rounded: {
      description: 'The border radius of the button.',
      control: {
        type: 'select',
      },
      options: Object.keys(BUTTON_ROUNDED),
      defaultValue: 'md',
    },
    onClick: {
      description: 'Optional click handler',
      action: 'clicked',
    },
    label: {
      description: 'Optional label for the button',
      control: {
        type: 'text',
      },
    },
    variant: {
      description: 'Optional variant for the button (solid, outline, ghost, soft, link).',
      control: {
        type: 'select',
      },
      options: BUTTON_VARIANTS,
      defaultValue: 'solid',
    },
    color: {
      description: 'Optional color for the button',
      control: {
        type: 'select',
      },
      options: ALL_COLOR_VARIANTS,
      defaultValue: 'primary',
    },
    leftIcon: {
      description: 'Optional left icon for the button',
      control: {
        type: 'object',
      },
    },
    rightIcon: {
      description: 'Optional right icon for the button',
      control: {
        type: 'object',
      },
    },
    isLoading: {
      description: 'Optional loading for the button',
      control: {
        type: 'boolean',
      },
    },
    loadingText: {
      description: 'Optional loading text for the button',
      control: {
        type: 'text',
      },
    },
    wrapperClassName: {
      description: 'Optional wrapper class name for the button text and icons (if any)',
      control: {
        type: 'text',
      },
    },
    className: {
      description: 'Optional class name for the button',
      control: {
        type: 'text',
      },
    },
    unstyled: {
      description: 'Optional unstyled button',
      control: {
        type: 'boolean',
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Basic: Story = {
  args: {
    size: 'md',
    rounded: 'md',
    label: 'Button',
    variant: 'solid',
    color: 'primary',
    isLoading: false,
    wrapperClassName: '',
    disabled: false,
  },
};

export const WithUnstyled: Story = {
  args: {
    ...Basic.args,
    unstyled: true,
  },
};

export const WithVariant: Story = {
  render: (args) => {
    return (
      <Grid gap="4" gridCols="5">
        {BUTTON_VARIANTS.map((variant) => (
          <Button {...args} variant={variant} key={variant}>
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
          </Button>
        ))}
      </Grid>
    );
  },
  args: {
    color: 'indigo',
  },
};

export const WithVariantPrimary: Story = {
  args: {
    variant: 'soft',
    color: 'primary',
    label: " I'm a primary button",
  },
};

export const WithSolidVariant: Story = {
  render: (args) => {
    return (
      <Grid gap="4" gridCols="5">
        {ALL_COLOR_VARIANTS.map((color) => (
          <Button {...args} color={color} key={color}>
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </Button>
        ))}
      </Grid>
    );
  },
};

export const WithSurfaceVariant: Story = {
  ...WithSolidVariant,
  args: {
    variant: 'surface',
  },
};

export const WithOutlineVariant: Story = {
  ...WithSolidVariant,
  args: {
    variant: 'outline',
  },
};

export const WithSoftVariant: Story = {
  ...WithSolidVariant,
  args: {
    variant: 'soft',
  },
};

export const WithGhostVariant: Story = {
  ...WithSolidVariant,
  args: {
    variant: 'ghost',
  },
};

export const WithLinkVariant: Story = {
  ...WithSolidVariant,
  args: {
    variant: 'link',
  },
};

export const WithSize: Story = {
  render: (args) => {
    const sizes = Object.keys(BUTTON_SIZE) as Array<keyof typeof BUTTON_SIZE>;
    return (
      <Flex alignItems="center" gap="4" flexDir="row">
        {sizes.map((size) => (
          <Button {...args} size={size} key={size}>
            {size.toUpperCase()}
          </Button>
        ))}
      </Flex>
    );
  },
};

export const WithRounded: Story = {
  render: (args) => {
    const rounds = Object.keys(BUTTON_ROUNDED) as Array<keyof typeof BUTTON_ROUNDED>;
    return (
      <Grid gridCols="5" alignItems="center" gap="4">
        {rounds.map((rounded) => (
          <Button {...args} rounded={rounded} key={rounded}>
            {rounded.toUpperCase()}
          </Button>
        ))}
      </Grid>
    );
  },
};

export const WithDisabled: Story = {
  render: (args) => <Button {...args}>Button</Button>,
  args: {
    disabled: true,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Primary Button',
  },
};

export const WithLoading: Story = {
  render: (args) => <Button {...args}>Button</Button>,
  args: {
    isLoading: true,
  },
};

export const WithLeftIcon: Story = {
  render: (args) => <Button {...args}>Login with Email Button</Button>,
  args: {
    leftIcon: <EnvelopeIcon className="h-4 w-4" />,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const loginButton = canvas.getByRole('button', {
      name: /Login with Email Button/i,
    });
    await userEvent.click(loginButton);
    await expect(args.onClick).toHaveBeenCalled();
  },
};

export const WithRightIcon: Story = {
  render: (args) => <Button {...args}>Login with Email Button</Button>,
  args: {
    rightIcon: <EnvelopeIcon className="h-4 w-4" />,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const loginButton = canvas.getByRole('button', {
      name: /Login with Email Button/i,
    });
    await userEvent.click(loginButton);
    await expect(args.onClick).toHaveBeenCalled();
  },
};

export const WithLoadingSize: Story = {
  render: (args) => {
    const sizes = Object.keys(BUTTON_SIZE) as Array<keyof typeof BUTTON_SIZE>;
    return (
      <div className="flex flex-row items-center gap-4">
        {sizes.map((size) => (
          <Button {...args} size={size} key={size}>
            {size.toUpperCase()}
          </Button>
        ))}
      </div>
    );
  },
  args: {
    isLoading: true,
  },
};

export const WithAllColorLoading: Story = {
  render: (args) => {
    return (
      <Grid gap="4" gridCols="5">
        {ALL_COLOR_VARIANTS.map((color) => (
          <Button {...args} color={color} key={color}>
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </Button>
        ))}
      </Grid>
    );
  },
  args: {
    isLoading: true,
  },
};

export const WithAllColorLoadingText: Story = {
  render: (args) => {
    return (
      <Grid gap="4" gridCols="5">
        {ALL_COLOR_VARIANTS.map((color) => (
          <Button {...args} color={color} key={color}>
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </Button>
        ))}
      </Grid>
    );
  },
  args: {
    isLoading: true,
    loadingText: 'Submitting...',
  },
};

export const WithAllColorDisabled: Story = {
  render: (args) => {
    return (
      <Grid gap="4" gridCols="5">
        {ALL_COLOR_VARIANTS.map((color) => (
          <Button {...args} color={color} key={color}>
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </Button>
        ))}
      </Grid>
    );
  },
  args: {
    disabled: true,
  },
};

export const WithAllVariantColor: Story = {
  render: (args) => {
    return (
      <div className="flex flex-col gap-6">
        {BUTTON_VARIANTS.map((variant) => (
          <div className="flex flex-col gap-4">
            <Heading>{variant.charAt(0).toUpperCase() + variant.slice(1)}</Heading>
            <Grid gap="4" gridCols="5">
              {ALL_COLOR_VARIANTS.map((color) => (
                <Button {...args} variant={variant} color={color} key={variant + color}>
                  {variant.charAt(0).toUpperCase() + variant.slice(1)} {color}
                </Button>
              ))}
            </Grid>
          </div>
        ))}
      </div>
    );
  },
};

export const WithAllVariantColorLoading: Story = {
  render: (args) => {
    return (
      <div className="flex flex-col gap-6">
        {BUTTON_VARIANTS.map((variant) => (
          <div className="flex flex-col gap-4">
            <Heading>{variant.charAt(0).toUpperCase() + variant.slice(1)}</Heading>
            <Grid gap="4" gridCols="5">
              {ALL_COLOR_VARIANTS.map((color) => (
                <Button {...args} variant={variant} color={color} key={variant + color}>
                  {variant.charAt(0).toUpperCase() + variant.slice(1)} {color}
                </Button>
              ))}
            </Grid>
          </div>
        ))}
      </div>
    );
  },
  args: {
    isLoading: true,
  },
};

export const WithAllVariantColorDisabled: Story = {
  render: (args) => {
    return (
      <div className="flex flex-col gap-6">
        {BUTTON_VARIANTS.map((variant) => (
          <div className="flex flex-col gap-4">
            <Heading>{variant.charAt(0).toUpperCase() + variant.slice(1)}</Heading>
            <Grid gap="4" gridCols="5">
              {ALL_COLOR_VARIANTS.map((color) => (
                <Button {...args} variant={variant} color={color} key={variant + color}>
                  {variant.charAt(0).toUpperCase() + variant.slice(1)} {color}
                </Button>
              ))}
            </Grid>
          </div>
        ))}
      </div>
    );
  },
  args: {
    disabled: true,
  },
};
