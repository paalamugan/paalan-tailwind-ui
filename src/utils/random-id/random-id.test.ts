import { randomId } from './random-id';

describe('hooks/random-id', () => {
  it('returns random id with random- prefix', () => {
    expect(randomId().includes('random-')).toBe(true);
    expect(randomId()).toHaveLength(16);
  });
});
