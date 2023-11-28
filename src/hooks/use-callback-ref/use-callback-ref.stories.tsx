import { useEffect, useState } from 'react';

import { Box, Text } from '@/layouts';

import { useCallbackRef } from './use-callback-ref';

export default {
  title: 'hooks/State Management/useCallbackRef',
};

const ChildComponentWithUseCallbackRef = ({ autoIncrement, count }: { autoIncrement: VoidFunction; count: number }) => {
  const autoIncrementFn = useCallbackRef(autoIncrement);

  useEffect(() => {
    autoIncrementFn();
  }, [autoIncrementFn]);

  return <Text>Re-Render Count: {count} times</Text>;
};

export function WithUseCallbackRef() {
  const [count, setCount] = useState(0);

  const autoIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <Box>
      <ChildComponentWithUseCallbackRef autoIncrement={autoIncrement} count={count} />
    </Box>
  );
}

const ChildComponentWithoutUseCallbackRef = ({
  autoIncrement,
  count,
}: {
  autoIncrement: VoidFunction;
  count: number;
}) => {
  useEffect(() => {
    if (count >= 100) return;
    autoIncrement();
  }, [autoIncrement, count]);

  return <Text>Re-Render: {count} times</Text>;
};

export function WithoutUseCallbackRef() {
  const [count, setCount] = useState(0);

  const autoIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <Box>
      <ChildComponentWithoutUseCallbackRef autoIncrement={autoIncrement} count={count} />
    </Box>
  );
}
