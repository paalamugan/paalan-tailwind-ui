import { Pagination } from '@/components/Pagination';
import { Box, Text, VStack } from '@/layouts';

export default { title: 'hooks/State Management/usePagination' };

export function Usage() {
  return <Pagination total={200} siblings={1} initialPage={10} />;
}

export function WithSiblings() {
  return (
    <VStack>
      <Box>
        <Text mb="4">1 sibling (default)</Text>
        <Pagination total={200} siblings={1} initialPage={10} />
      </Box>
      <Box>
        <Text mb="4">2 siblings</Text>
        <Pagination total={200} siblings={2} initialPage={10} />
      </Box>
      <Box>
        <Text mb="4">3 siblings</Text>
        <Pagination total={200} siblings={3} initialPage={10} />
      </Box>
    </VStack>
  );
}

export function WithBoundaries() {
  return (
    <VStack>
      <Box>
        <Text mb="4">1 boundary (default)</Text>
        <Pagination total={200} boundaries={1} initialPage={10} />
      </Box>
      <Box>
        <Text mb="4">2 boundaries</Text>
        <Pagination total={200} boundaries={2} initialPage={10} />
      </Box>
      <Box>
        <Text mb="4">3 boundaries</Text>
        <Pagination total={200} boundaries={3} initialPage={10} />
      </Box>
    </VStack>
  );
}
