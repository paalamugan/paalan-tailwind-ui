import { useCallback, useEffect, useState } from 'react';

import { useWindowEvent } from '../use-window-event/use-window-event';

function getConnection(): NetworkStatus {
  if (typeof navigator === 'undefined') {
    return {};
  }

  const _navigator = navigator;
  const connection = _navigator.connection || _navigator.mozConnection || _navigator.webkitConnection;

  if (!connection) {
    return {};
  }

  return {
    downlink: connection?.downlink,
    downlinkMax: connection?.downlinkMax,
    effectiveType: connection?.effectiveType,
    rtt: connection?.rtt,
    saveData: connection?.saveData,
    type: connection?.type,
  };
}

export const useNetwork = () => {
  const [status, setStatus] = useState<{ online: boolean } & NetworkStatus>({
    online: true,
  });
  const handleConnectionChange = useCallback(() => setStatus((current) => ({ ...current, ...getConnection() })), []);

  useWindowEvent('online', () => setStatus({ online: true, ...getConnection() }));
  useWindowEvent('offline', () => setStatus({ online: false, ...getConnection() }));

  useEffect(() => {
    const _navigator = navigator as Navigator;

    if (_navigator.connection) {
      setStatus({ online: _navigator.onLine, ...getConnection() });
      _navigator.connection?.addEventListener?.('change', handleConnectionChange);
      return () => _navigator.connection?.removeEventListener?.('change', handleConnectionChange);
    }

    return undefined;
  }, [handleConnectionChange]);

  return status;
};
