import { LabelInput } from '@/components';
import { Box, Text } from '@/layouts';

import { useInputState } from '../use-input-state';
import { usePrevious } from './use-previous';

export default { title: 'hooks/State Management/usePrevious' };

export function Usage() {
  const [value, setValue] = useInputState('');
  const previousValue = usePrevious(value);

  return (
    <Box>
      <LabelInput
        label="Enter some text here"
        placeholder="Enter some text here"
        id="previous-demo-input"
        value={value}
        onChange={setValue}
      />
      <Text mt="4">Current value: {value}</Text>
      <Text>Previous value: {previousValue}</Text>
    </Box>
  );
}
