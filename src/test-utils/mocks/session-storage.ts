export const mockSessionStorage = (value: string) => {
  Object.defineProperty(window, 'sessionStorage', {
    writable: true,
    value: {
      getItem: () => value,
      setItem: jest.fn(),
    },
  });
};
