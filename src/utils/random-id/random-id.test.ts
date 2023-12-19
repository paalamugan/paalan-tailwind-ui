import { randomId } from './random-id';

describe('Hooks/random-id', () => {
  it('returns random id with random- prefix', () => {
    expect(randomId().includes('random-')).toBe(true);
    expect(randomId()).toHaveLength(16);
  });
});
