import { Loading } from '@/components/Loading';
import { Box } from '@/layouts';

export const LoadingIndicator: React.FC = () => {
  return (
    <Box className="h-full bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <Box className="mx-auto max-w-max">
        <Box className="flex min-h-[40px] bg-white p-6">
          <Loading className="px-1" />
        </Box>
      </Box>
    </Box>
  );
};
