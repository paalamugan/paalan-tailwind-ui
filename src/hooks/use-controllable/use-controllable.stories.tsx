import { Input, Label } from '@/components';

import { useControllableState } from './use-controllable';

export default {
  title: 'hooks/State Management/useControllable',
};

export function Controlled() {
  const [value, setValue] = useControllableState({
    value: 'Hello World',
  });

  return (
    <div>
      <Label>Controlled Input</Label>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
}

export function Uncontrolled() {
  const [value, setValue] = useControllableState({
    defaultValue: 'Hello World',
  });

  return (
    <div>
      <Label>Uncontrolled Input</Label>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
}
