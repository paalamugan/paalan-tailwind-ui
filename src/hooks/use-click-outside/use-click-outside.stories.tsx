import { useState } from 'react';

import { Button } from '@/components';
import { Box } from '@/layouts';
import { LI, P, UL } from '@/layouts/Typography';

import { useClickOutside } from './use-click-outside';

export default {
  title: 'Hooks/UI And Dom/useClickOutside',
};

export function Usage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const ref = useClickOutside<HTMLDivElement>(closeMenu);

  return (
    <Box>
      <Button variant="outline" onClick={openMenu}>
        Click here to open Menu
      </Button>
      {isMenuOpen && (
        <>
          <Box ref={ref} borderColor="pink" className="mt-6 border p-2">
            <UL>
              <LI>Menu Item 1</LI>
              <LI>Menu Item 2</LI>
              <LI>Menu Item 3</LI>
            </UL>
          </Box>
          <P>Click outside of the pink border to close Menu</P>
        </>
      )}
    </Box>
  );
}
