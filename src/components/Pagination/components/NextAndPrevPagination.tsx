import type { FC } from 'react';

import { Button } from '@/components/Button';
import { ChevronLeftIcon, ChevronRightIcon } from '@/icons';
import { Flex, HStack } from '@/layouts';

export interface NextAndPrevPaginationProps {
  onNext: () => void;
  onPrev: () => void;
  isDisabledNext: boolean;
  isDisabledPrev: boolean;
}

export const NextAndPrevPagination: FC<NextAndPrevPaginationProps> = ({
  onNext,
  onPrev,
  isDisabledNext,
  isDisabledPrev,
}) => {
  return (
    <Flex className="gap-4">
      <Button variant="outline" aria-label="Previous" disabled={isDisabledPrev} onClick={onPrev}>
        <HStack>
          <ChevronLeftIcon className="h-5 w-5" /> Previous
        </HStack>
      </Button>
      <Button variant="outline" aria-label="Next" disabled={isDisabledNext} onClick={onNext}>
        <HStack>
          Next <ChevronRightIcon className="h-5 w-5" />
        </HStack>
      </Button>
    </Flex>
  );
};
