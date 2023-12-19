import type React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import { useHover } from './use-hover';

const Target: React.FunctionComponent = () => {
  const { ref, hovered } = useHover();

  return (
    <div data-testid="target" ref={ref}>
      {hovered ? 'true' : 'false'}
    </div>
  );
};

describe('Hooks/use-hover', () => {
  it('changes `hovered` on mouseenter/mouseleave correctly', () => {
    render(<Target />);
    const target = screen.getByTestId('target');

    expect(target).toHaveTextContent('false');

    fireEvent.mouseEnter(target);
    expect(target).toHaveTextContent('true');

    fireEvent.mouseLeave(target);
    expect(target).toHaveTextContent('false');
  });
});
