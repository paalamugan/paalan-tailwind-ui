import type { UseFocusWithinOptions } from './use-focus-within';

import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { useFocusWithin } from './use-focus-within';

function Wrapper(props: UseFocusWithinOptions) {
  const { ref, focused } = useFocusWithin<HTMLDivElement>(props);
  return (
    <div ref={ref}>
      <input type="text" />
      <button type="button">Button</button>
      {focused && <div>test-focused</div>}
    </div>
  );
}

describe('Hooks/use-focus-within', () => {
  it('detects focus on child elements as expected', async () => {
    const onBlur = jest.fn();
    const onFocus = jest.fn();

    render(<Wrapper onFocus={onFocus} onBlur={onBlur} />);
    expect(screen.queryAllByText('test-focused')).toHaveLength(0);
    expect(document.body).toHaveFocus();

    userEvent.tab();
    await waitFor(() => expect(screen.getByRole('textbox')).toHaveFocus());
    expect(screen.getByRole('textbox')).toHaveFocus();
    expect(screen.getByText('test-focused')).toBeInTheDocument();
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledTimes(0);

    userEvent.tab();
    await waitFor(() => expect(screen.getByRole('button')).toHaveFocus());
    expect(screen.getByText('test-focused')).toBeInTheDocument();
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledTimes(0);

    userEvent.tab();
    await waitFor(() => expect(screen.queryAllByText('test-focused')).toHaveLength(0));
    expect(document.body).toHaveFocus();
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });
});
