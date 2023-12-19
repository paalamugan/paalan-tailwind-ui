import { Box, Code, Heading, Text } from '@/layouts';

import { useQueryFetcher } from './use-query-fetcher';

export default { title: 'Hooks/Utilities/useQueryFetcher' };

const fetcher = async (param: { id: string }) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${param.id}`);
  const data = await response.json();
  return data;
};

export function Usage() {
  const { data, loading, error, initialized } = useQueryFetcher(fetcher, { skip: false, id: '1' });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (!initialized) {
    return <Text>Initializing...</Text>;
  }

  return (
    <Box>
      <Heading mb="3">Fetched data:</Heading>
      <Code>{JSON.stringify(data, null, 2)}</Code>
    </Box>
  );
}
