import { Button } from '@/components/Button';
import { Box, Code, Heading, Text } from '@/layouts';

import { useLazyQueryFetcher } from './use-lazy-query-fetcher';

export default { title: 'hooks/Utilities/useLazyQueryFetcher' };

const getData = async (param: { id: string }) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${param.id}`);
  const data = await response.json();
  return data as { id: string; title: string; completed: boolean };
};

export function Usage() {
  const { data, loading, error, fetcher } = useLazyQueryFetcher(getData);

  return (
    <Box>
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {(error as Error).message}</Text>}
      {data && (
        <>
          <Heading mb="3">Fetched data:</Heading>
          <Code>{JSON.stringify(data, null, 2)}</Code>
        </>
      )}
      <Box mt="4" mb="3">
        <Button onClick={() => fetcher({ id: '1' })} isLoading={loading}>
          Fetch data with id 1
        </Button>
      </Box>
    </Box>
  );
}
