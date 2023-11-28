import { useState } from 'react';

import { Button, Dialog } from '@/components';

import { useFocusReturn } from './use-focus-return';

export default {
  title: 'hooks/UI And Dom/useFocusReturn',
};

export function Usage() {
  const [opened, setOpened] = useState(false);

  useFocusReturn({ opened, shouldReturnFocus: true });

  return (
    <Dialog
      trigger={
        <Button variant="outline" className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Open Dialog
        </Button>
      }
      open={opened}
      onOpenChange={(open) => setOpened(open)}
      modal
      header={{
        title: 'Dialog',
        description: 'When you close the dialog and focus should return to the button.',
      }}
    />
  );
}
