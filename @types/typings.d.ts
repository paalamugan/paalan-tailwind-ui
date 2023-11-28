interface NetworkStatus {
  downlink?: number;
  downlinkMax?: number;
  effectiveType?: 'slow-2g' | '2g' | '3g' | '4g';
  rtt?: number;
  saveData?: boolean;
  type?: 'bluetooth' | 'cellular' | 'ethernet' | 'wifi' | 'wimax' | 'none' | 'other' | 'unknown';
  addEventListener?: (type: string, listener: EventListenerOrEventListenerObject) => void;
  removeEventListener?: (type: string, listener: EventListenerOrEventListenerObject) => void;
}

interface NavigatorUserAgentData {
  brands?: Array<{ brand: string; version: string }>;
  mobile?: boolean;
  platform?: string;
  uaFullVersion?: string;
  uaListVersion?: string;
  userAgent?: string;
}

interface Navigator {
  userAgentData?: NavigatorUserAgentData;
  connection?: NetworkStatus;
  mozConnection?: NetworkStatus;
  webkitConnection?: NetworkStatus;
  onLine: boolean;
}

class EyeDropper {
  open(options?: { signal?: AbortSignal }): Promise<{ sRGBHex: string }>;
}
interface Window {
  EyeDropper: typeof EyeDropper;
}
