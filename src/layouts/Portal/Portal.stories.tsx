import type { Meta } from '@storybook/react';

import { Box } from '../Box';
import { Text } from '../Text';
import { Portal } from './Portal';

const meta: Meta<typeof Portal> = {
  title: 'Layouts/Portal',
  component: Portal,
  tags: ['autodocs'],
};
export default meta;

export function Usage() {
  return (
    <>
      <Box id="portal-target" />
      <Portal style={{ background: 'pink' }}>
        <Text>Default portal</Text>
      </Portal>
      <Portal style={{ background: 'pink' }} target="#portal-target">
        <Text>Portal with custom target element</Text>
      </Portal>
    </>
  );
}

export function ElementTarget() {
  const target = document.createElement('div');
  document.body.appendChild(target);
  return (
    <>
      <Portal style={{ background: 'pink' }} target={target}>
        <Text>Portal with target element</Text>
      </Portal>
    </>
  );
}
