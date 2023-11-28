import { createRef, useRef } from 'react';

import type React from 'react';

import { render } from '@testing-library/react';

import { useMergedRef } from './use-merged-ref';

function TestComponent({ refs }: { refs: React.ForwardedRef<HTMLButtonElement>[] }) {
  const ref = useRef<HTMLButtonElement>(null);
  return <button ref={useMergedRef(...refs, ref)} type="button" />;
}

describe('hook/use-merged-ref', () => {
  it('assigns refs to all given arguments', () => {
    const objectRef = createRef<HTMLButtonElement>();
    let fnRefValue: HTMLButtonElement | null = null;
    const fnRef = (node: HTMLButtonElement | null) => {
      fnRefValue = node;
    };

    render(<TestComponent refs={[objectRef, fnRef]} />);
    expect(fnRefValue).toBeInstanceOf(HTMLButtonElement);
    expect(objectRef.current instanceof HTMLButtonElement).toBe(true);
  });
});
