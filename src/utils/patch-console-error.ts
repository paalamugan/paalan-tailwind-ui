/* Patches console.error during tests, used to test that component throws error during rendering */

const initialError = console.error;

export const patchConsoleError = () => {
  console.error = () => {};
};

patchConsoleError.release = () => {
  console.error = initialError;
};
