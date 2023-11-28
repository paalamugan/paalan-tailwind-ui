import type { FC, ReactNode } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { ReloadIcon } from '@/icons';
import { Box, Heading, Stack, Text } from '@/layouts';
import { cn } from '@/utils/helper';

import { Strong } from '../../layouts/Typography';
import { Button } from '../Button';

interface ErrorRouterComponentProps {
  error: Error;
  heading?: ReactNode;
  className?: string;
}
export const ErrorRouterComponent: FC<ErrorRouterComponentProps> = ({ error, className, heading }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Stack className={cn('mx-auto max-w-3xl items-center', className)}>
      <Box className="flex min-h-[40px] flex-col gap-2 bg-white p-6">
        {heading ? (
          heading
        ) : (
          <Heading as="h4" className="flex text-red-500" alignItems="center">
            <Strong>Error Message: </Strong> <Text pl="1">{error.message}</Text>
          </Heading>
        )}
      </Box>
      <Button id="refresh" variant="outline" onClick={() => navigate(location.pathname)} leftIcon={<ReloadIcon />}>
        Refresh
      </Button>
    </Stack>
  );
};
