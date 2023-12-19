import { useRef, useState } from 'react';

import type React from 'react';

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { useClickOutside } from './use-click-outside';

interface UseClickOutsideProps {
  handler: () => void;
  events?: string[] | null;
  nodes?: HTMLElement[];
}

const Target: React.FunctionComponent<UseClickOutsideProps> = ({ handler, events, nodes }) => {
  const ref = useClickOutside<HTMLDivElement>(handler, events, nodes);
  return <div data-testid="target" ref={ref} />;
};

describe('Hooks/use-click-outside', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('calls `handler` function when clicked outside target (no `events` given)', async () => {
    const handler = jest.fn();

    render(
      <>
        <Target handler={handler} />
        <div data-testid="outside-target" />
      </>,
    );

    const target = screen.getByTestId('target');
    const outsideTarget = screen.getByTestId('outside-target');

    expect(handler).toHaveBeenCalledTimes(0);

    await userEvent.click(target);
    expect(handler).toHaveBeenCalledTimes(0);

    await userEvent.click(outsideTarget);
    expect(handler).toHaveBeenCalledTimes(2);

    await userEvent.click(outsideTarget);
    expect(handler).toHaveBeenCalledTimes(4);

    await userEvent.click(target);
    expect(handler).toHaveBeenCalledTimes(4);
  });

  it('calls `handler` only on given `events`', async () => {
    const handler = jest.fn();
    const events = ['keydown'];

    render(
      <>
        <Target handler={handler} events={events} />
        <div data-testid="outside-target" />
      </>,
    );

    const target = screen.getByTestId('target');
    const outsideTarget = screen.getByTestId('outside-target');

    await userEvent.click(target);
    await userEvent.click(outsideTarget);
    expect(handler).toHaveBeenCalledTimes(0);

    await userEvent.type(target, '{enter}');
    await userEvent.type(outsideTarget, '{enter}');
    expect(handler).toHaveBeenCalledTimes(2);
  });

  it('ignores clicks outside the given `nodes`', async () => {
    const handler = jest.fn();

    const Wrapper: React.FunctionComponent = () => {
      const [ignore, setIgnore] = useState<HTMLDivElement | null>(null);
      const ignoreRef = useRef<HTMLDivElement | null>(null);

      return (
        <>
          <Target handler={handler} nodes={ignore ? [ignore] : undefined} />
          <div data-testid="ignore-clicks" ref={ignoreRef} onClick={() => setIgnore(ignoreRef.current)} />
        </>
      );
    };

    render(
      <div>
        <Wrapper />
      </div>,
    );

    const ignoreClicks = screen.getByTestId('ignore-clicks');

    await userEvent.click(ignoreClicks);
    expect(handler).toHaveBeenCalledTimes(2);

    const target = screen.getByTestId('target');
    await userEvent.click(target);
    expect(handler).toHaveBeenCalledTimes(4);
  });
});
