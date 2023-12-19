import { useState } from 'react';

import { Button, Input, LabelInput } from '@/components';
import { Box, Stack, Strong, Text } from '@/layouts';

import { useDebouncedValue } from './use-debounced-value';

export default {
  title: 'Hooks/State Management/useDebouncedValue',
};

export function Usage() {
  const [value, setValue] = useState('');
  const [searchTerm] = useDebouncedValue(value, 200);

  return (
    <Stack>
      <LabelInput label="Enter value to see debounce" value={value} onChange={(e) => setValue(e.target.value)} />
      <Text>
        Value: <Strong>{value}</Strong>
      </Text>
      <Text>
        Debounced Value: <Strong>{searchTerm}</Strong>
      </Text>
    </Stack>
  );
}

export function LeadingUpdate() {
  const [value, setValue] = useState('');
  const [searchTerm] = useDebouncedValue(value, 200, { leading: true });

  return (
    <Stack>
      <LabelInput label="Enter value to see debounce" value={value} onChange={(e) => setValue(e.target.value)} />
      <Text>
        Value: <Strong>{value}</Strong>
      </Text>
      <Text>
        Debounced Value: <Strong>{searchTerm}</Strong>
      </Text>
    </Stack>
  );
}

export function WithCancel() {
  const [value, setValue] = useState('Initial value');
  const [searchTerm, cancel] = useDebouncedValue(value, 500);

  return (
    <Box>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <Text mt="2">
        <Strong>Debounced Value:</Strong> {searchTerm}
      </Text>
      <Button variant="outline" onClick={cancel}>
        Cancel
      </Button>
    </Box>
  );
}
