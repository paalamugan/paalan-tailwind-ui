import { useState } from 'react';

import { Input, LabelInput, NumberInput } from '@/components';
import { Stack } from '@/layouts';

import { useInputState } from './use-input-state';

export default { title: 'Hooks/State Management/useInputState' };

export function Usage() {
  const [stringValue, setStringValue] = useInputState('');
  const [numberValue, setNumberValue] = useInputState(0);

  return (
    <Stack>
      <Input type="text" value={stringValue} onChange={setStringValue} placeholder="Enter a Text" />
      <LabelInput label="Label" value={stringValue} onValueChange={setStringValue} placeholder="Enter a Text" />
      <NumberInput value={numberValue} onChange={setNumberValue} placeholder="Enter a number" />
    </Stack>
  );
}

export function WithUseState() {
  const [stringValue, setStringValue] = useState('');
  const [numberValue, setNumberValue] = useState(0);

  return (
    <Stack>
      <Input
        type="text"
        value={stringValue}
        onChange={(event) => setStringValue(event.currentTarget.value)}
        placeholder="Enter a Text"
      />
      <LabelInput
        label="Label"
        value={stringValue}
        onChange={(event) => setStringValue(event.currentTarget.value)}
        placeholder="Enter a Text"
      />
      <NumberInput value={numberValue} onValueChange={(value) => setNumberValue(+value)} />
    </Stack>
  );
}
