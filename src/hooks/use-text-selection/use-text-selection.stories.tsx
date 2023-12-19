import { Box, Heading, Stack } from '@/layouts';
import { P, Strong } from '@/layouts/Typography';

import { useTextSelection } from './use-text-selection';

export default { title: 'Hooks/Utilities/useTextSelection' };

export function Usage() {
  const selection = useTextSelection();
  return (
    <Stack p="20">
      <Heading as="h3">Select a text from above content:</Heading>
      <Box>
        <P>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse id architecto, nostrum laboriosam quisquam
          dolores beatae! Ipsum a eos cum voluptates, explicabo reprehenderit nihil iste! Nam voluptate non vel dicta.
        </P>
        <P>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse id architecto, nostrum laboriosam quisquam
          dolores beatae! Ipsum a eos cum voluptates, explicabo reprehenderit nihil iste! Nam voluptate non vel dicta.
        </P>
      </Box>
      <P mt="4">
        <Strong>Selected Text:</Strong> {selection?.toString()}
      </P>
    </Stack>
  );
}
