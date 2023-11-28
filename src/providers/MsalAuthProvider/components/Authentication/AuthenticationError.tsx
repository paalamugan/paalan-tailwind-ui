import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from '@/components';
import { Box, Heading } from '@/layouts';

import { useMsalAuth } from '../../context';

interface AuthenticationErrorProps {
  error: Error;
}
export const AuthenticationError: React.FC<AuthenticationErrorProps> = ({ error }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { authFailRedirectPath } = useMsalAuth();

  return (
    <Box className="h-full bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <Box className="mx-auto max-w-3xl">
        <Box className="flex min-h-[40px] gap-2 bg-white p-6 text-red-600">
          <Heading as="h3" className="whitespace-nowrap">
            Authentication Error:
          </Heading>
          <Heading as="h4">{error.message}</Heading>
        </Box>
        <Button
          id="gotToSignin"
          variant="outline"
          onClick={() =>
            navigate(authFailRedirectPath, {
              state: {
                from: location,
              },
            })
          }
        >
          Go to Sign In
        </Button>
      </Box>
    </Box>
  );
};
