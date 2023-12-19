import { Checkbox } from '@/components';
import { Input } from '@/components/Input';
import { Box, Flex, Stack } from '@/layouts';
import { P, Strong } from '@/layouts/Typography';

import { useSessionStorage } from './use-session-storage';

export default {
  title: 'Hooks/State Management/useSessionStorage',
};

export function Usage() {
  const [value, setValue] = useSessionStorage<string>({
    key: 'sessionStorage/val',
    defaultValue: 'Value persists through reloads.',
  });

  return (
    <div className="p-6">
      <Input value={value} label="Input" onChange={(e) => setValue(e.target.value)} />
      <P>
        <Strong>Session Value</Strong>: {value}
      </P>
    </div>
  );
}

export function SerializeJson() {
  const [value, setValue] = useSessionStorage<{ name: string }>({
    key: 'sessionStorage/val',
    defaultValue: { name: 'is awesome' },
  });

  const [value2, setValue2] = useSessionStorage<{ name: string }>({
    key: 'sessionStorage/val',
    defaultValue: { name: 'is awesome' },
  });

  const [value3, setValue3] = useSessionStorage<{ name: string }>({
    key: 'sessionStorage/another-value',
    defaultValue: { name: 'is awesome' },
  });

  return (
    <Stack p="20" direction="column">
      <Input label="Value 1" value={value?.name} onChange={(event) => setValue({ name: event.target.value })} />
      <Input label="Value 2" value={value2?.name} onChange={(event) => setValue2({ name: event.target.value })} />
      <Input label="Value 3" value={value3?.name} onChange={(event) => setValue3({ name: event.target.value })} />
    </Stack>
  );
}

export function SerializeBoolean() {
  const [value, setValue] = useSessionStorage<boolean>({
    key: 'sessionStorage/val',
    defaultValue: true,
  });

  return (
    <Box p="20">
      <Checkbox
        label="Value"
        checked={value}
        onCheckedChange={(value) => {
          setValue(value);
        }}
      />
    </Box>
  );
}

export function MultipleHooks() {
  const [value, setValue] = useSessionStorage<string>({
    key: 'some-value',
    defaultValue: '',
  });

  const [value2] = useSessionStorage<string>({
    key: 'some-value',
    defaultValue: '',
  });

  return (
    <Flex p="20" gap="4">
      <Input label="Some Value" value={value} onChange={(event) => setValue(event.currentTarget.value)} />
      <Input label="Readonly" value={value2} readOnly />
    </Flex>
  );
}
