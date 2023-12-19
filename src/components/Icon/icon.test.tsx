import { RocketLaunchIcon } from '@/icons';
import { testA11y } from '@/test-utils';

import { Icon } from './icon';

it('passes a11y test', async () => {
  await testA11y(<Icon />);
});

it('passes a11y test given a third-party icon', async () => {
  await testA11y(<Icon as={RocketLaunchIcon} />);
});
