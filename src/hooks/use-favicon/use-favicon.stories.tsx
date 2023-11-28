import { Box, Heading, Text } from '@/layouts';

import { useFavicon } from './use-favicon';

export default {
  title: 'hooks/Utilities/useFavicon',
};

export function Usage() {
  useFavicon('https://example.com/favicon.ico');

  return (
    <Box>
      <Heading as="h2">useFavicon Example</Heading>
      <Text>The favicon should now be set to the example.com favicon.</Text>
    </Box>
  );
}
