import { Button } from '@/components/Button';
import { Box, Center, Paper, Text } from '@/layouts';

import { useScrollIntoView } from './use-scroll-into-view';

export default { title: 'hooks/UI And Dom/useScrollIntoView' };

export function Usage() {
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 60,
  });

  return (
    <Center gap="4" flexDir="column">
      <Button
        onClick={() =>
          scrollIntoView({
            alignment: 'center',
          })
        }
        color="blue"
      >
        Scroll to target
      </Button>
      <Box
        className="w-full bg-blue-100"
        style={{
          height: '50vh',
        }}
      />
      <Text ref={targetRef}>Hello there</Text>
    </Center>
  );
}

export function ParentNode() {
  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView<HTMLDivElement, HTMLDivElement>();

  return (
    <Center gap="4">
      <Paper ref={scrollableRef} h="80" style={{ overflowY: 'scroll', flex: 1 }}>
        <Box pt="108" pb="128">
          <Paper ref={targetRef} p="8" className="w-full bg-blue-100">
            <Text>Scroll me into view</Text>
          </Paper>
        </Box>
      </Paper>
      <Button onClick={() => scrollIntoView()}>Scroll to target</Button>
    </Center>
  );
}

export function ScrollXAxis() {
  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView<HTMLDivElement, HTMLDivElement>({ axis: 'x' });

  return (
    <Center gap="4">
      <Paper ref={scrollableRef} h="44" w="84" style={{ overflowX: 'scroll' }}>
        <Box pl="80" pr="128">
          <Paper ref={targetRef} p="8" className="w-max bg-blue-100">
            <Text>Scroll me into view</Text>
          </Paper>
        </Box>
      </Paper>
      <Button onClick={() => scrollIntoView()}>Scroll to target</Button>
    </Center>
  );
}
