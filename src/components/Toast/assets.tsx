import type { ToastTypes } from './types';

import { ErrorIcon } from '@/icons/icons/ErrorIcon';
import { InfoIcon1 } from '@/icons/icons/InfoIcon1';
import { SuccessIcon } from '@/icons/icons/SuccessIcon';
import { WarningIcon1 } from '@/icons/icons/WarningIcon1';

const bars = Array(12).fill(0);

export const Loader = ({ visible }: { visible: boolean }) => {
  return (
    <div className="toast-loading-wrapper" data-visible={visible}>
      <div className="toast-spinner">
        {bars.map((_, i) => (
          <div className="toast-loading-bar" key={`spinner-bar-${i}`} />
        ))}
      </div>
    </div>
  );
};

export const getAsset = (type: ToastTypes): JSX.Element | null => {
  switch (type) {
    case 'success':
      return <SuccessIcon />;

    case 'error':
      return <ErrorIcon />;

    case 'warning':
      return <WarningIcon1 />;

    case 'info':
      return <InfoIcon1 />;

    default:
      return null;
  }
};
