import { Input } from '@/components';
import { Stack, Strong, Text } from '@/layouts';

import { useLocalStorage } from './use-local-storage';

export default {
  title: 'Hooks/State Management/useLocalStorage',
};

export function Usage() {
  const [value, setValue] = useLocalStorage<string>({
    key: 'localStorage/val',
    defaultValue: 'Value persists through reloads and changes across multiple tabs',
  });

  return (
    <Stack p="5">
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <Text>
        <Strong>Current value:</Strong> {value}
      </Text>
    </Stack>
  );
}

export function SerializeJson() {
  const [value, setValue] = useLocalStorage<{ name: string }>({
    key: 'localStorage/val',
    defaultValue: { name: 'is awesome' },
  });

  const [value2, setValue2] = useLocalStorage<{ name: string }>({
    key: 'localStorage/val',
    defaultValue: { name: 'is awesome' },
  });

  const [value3, setValue3] = useLocalStorage<{ name: string }>({
    key: 'localStorage/another-value',
    defaultValue: { name: 'is awesome' },
  });

  return (
    <Stack p="5">
      <Input value={value?.name} onChange={(event) => setValue({ name: event.target.value })} />
      <Input value={value2?.name} onChange={(event) => setValue2({ name: event.target.value })} />
      <Input value={value3?.name} onChange={(event) => setValue3({ name: event.target.value })} />
    </Stack>
  );
}

export function SerializeBoolean() {
  const [value, setValue] = useLocalStorage<boolean>({
    key: 'localStorage/val',
    defaultValue: true,
  });

  return (
    <Stack p="5">
      <Input
        type="checkbox"
        checked={value}
        onChange={(event) => {
          setValue(event.currentTarget.checked);
        }}
      />
    </Stack>
  );
}

export function MultipleHooks() {
  const [value, setValue] = useLocalStorage<string>({
    key: 'some-value',
    defaultValue: '',
  });

  const [value2] = useLocalStorage<string>({
    key: 'some-value',
    defaultValue: '',
  });

  return (
    <Stack p="5">
      <Input value={value} onChange={(event) => setValue(event.currentTarget.value)} />
      <Input value={value2} readOnly />
    </Stack>
  );
}
