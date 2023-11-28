import type { Meta, StoryObj } from '@storybook/react';

import { BOX_COLOR_VARIANTS } from '@/constants/colors';
import {
  alignContent,
  alignItems,
  alignSelf,
  flexDirection,
  flexWrap,
  justifyContent,
  justifyItems,
  justifySelf,
  placeContent,
  placeItems,
  placeSelf,
} from '@/system/constants/flexbox-styling';
import { disableStorybookArgTypes } from '@/utils/helper';

import { Box } from './Box';

const meta: Meta<typeof Box> = {
  title: 'layouts/Box',
  component: Box,
  tags: ['autodocs'],
  argTypes: {
    ...disableStorybookArgTypes(['htmlTranslate', 'pos', 'flexDir']),
    as: {
      description: 'The HTML element or React component to render',
      control: {
        type: 'text',
      },
    },
    position: {
      description: 'Position property for the box',
      options: ['absolute', 'fixed', 'relative', 'static', 'sticky'],
      control: {
        type: 'select',
      },
    },
    flexWrap: {
      options: Object.keys(flexWrap),
      control: {
        type: 'select',
      },
    },
    flexDirection: {
      options: Object.keys(flexDirection),
      control: {
        type: 'select',
      },
    },
    justifyContent: {
      options: Object.keys(justifyContent),
      control: {
        type: 'select',
      },
    },
    justifyItems: {
      options: Object.keys(justifyItems),
      control: {
        type: 'select',
      },
    },
    justifySelf: {
      options: Object.keys(justifySelf),
      control: {
        type: 'select',
      },
    },
    alignContent: {
      options: Object.keys(alignContent),
      control: {
        type: 'select',
      },
    },
    alignItems: {
      options: Object.keys(alignItems),
      control: {
        type: 'select',
      },
    },
    alignSelf: {
      options: Object.keys(alignSelf),
      control: {
        type: 'select',
      },
    },
    placeContent: {
      options: Object.keys(placeContent),
      control: {
        type: 'select',
      },
    },
    placeItems: {
      options: Object.keys(placeItems),
      control: {
        type: 'select',
      },
    },
    placeSelf: {
      options: Object.keys(placeSelf),
      control: {
        type: 'select',
      },
    },
    flexGrow: {
      options: ['1', '0'],
      control: {
        type: 'select',
      },
    },
    flexShrink: {
      options: ['1', '0'],
      control: {
        type: 'select',
      },
    },

    display: {
      description: 'Display property for the box',
      options: ['block', 'flex', 'inline', 'grid', 'inline-block', 'none'],
      control: {
        type: 'select',
      },
    },
    bg: {
      description: 'Background color for the box',
      options: BOX_COLOR_VARIANTS,
      control: {
        type: 'select',
      },
    },
    color: {
      description: 'Text color for the box',
      options: BOX_COLOR_VARIANTS,
      control: {
        type: 'select',
      },
    },
    borderColor: {
      description: 'Border color for the box',
      options: BOX_COLOR_VARIANTS,
      control: {
        type: 'select',
      },
    },
    size: {
      description: 'Size for the box',
    },
  },
};
export default meta;

type Story = StoryObj<typeof Box>;

export const Basic: Story = {
  args: {
    children: 'Box',
    as: 'section',
    bg: 'blue',
    color: 'white',
    p: '4',
  },
};
