import { createRef } from 'react';

import type React from 'react';

import { render } from '../../render';

interface Options<Props = unknown> {
  component: React.ComponentType<Props>;
  props: Props;
  refType: unknown;
  refProp?: string;
  selector?: string;
}

export const itSupportsRef = <Props,>(options: Options<Props>, name = 'supports ref') => {
  it(name, () => {
    const ref = createRef<typeof options.refType>();
    render(<options.component {...options.props} {...{ [options.refProp || 'ref']: ref }} />);
    expect(ref.current).toBeInstanceOf(options.refType);
  });
};
