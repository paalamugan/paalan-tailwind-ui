export const isRefObject = (val: unknown): val is { current: unknown } => {
  return 'current' in (val as Record<string, unknown>);
};

const isDom = () => typeof window !== 'undefined';
function getPlatform() {
  const agent = navigator.userAgentData;
  return agent?.platform ?? navigator.platform;
}
const vn = (v: RegExp) => isDom() && v.test(navigator.vendor);
const pt = (v: RegExp) => isDom() && v.test(getPlatform());
const isApple = () => pt(/mac|iphone|ipad|ipod/i);
export const isSafari = () => isApple() && vn(/apple/i);
