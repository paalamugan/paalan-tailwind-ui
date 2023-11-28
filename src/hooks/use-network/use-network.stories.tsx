import { Code, Heading, Stack } from '@/layouts';

import { useNetwork } from './use-network';

export default { title: 'hooks/Utilities/useNetwork' };

export function Usage() {
  const network = useNetwork();
  return (
    <Stack>
      <Heading as="h3">Network Status:</Heading>
      <Code className="whitespace-pre-wrap">{JSON.stringify(network, null, 2)}</Code>
    </Stack>
  );
}
