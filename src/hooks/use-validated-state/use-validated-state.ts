import { useState } from 'react';

/**
 * A custom hook that returns a stateful value, a last valid value, and a validation state based on the provided validation function.
 * @template T The type of the state value.
 * @param {T} initialValue The initial value of the state.
 * @param {(value: T) => boolean} validation The validation function that determines if the value is valid.
 * @param {boolean} [initialValidationState] The initial validation state. If not provided, it will be determined by the validation function using the initial value.
 * @returns {[{ value: T, lastValidValue: T | undefined, valid: boolean }, (val: T) => void]} A tuple containing the stateful value, last valid value, and validation state, and a function to update the stateful value.
 */
export const useValidatedState = <T>(
  initialValue: T,
  validation: (value: T) => boolean,
  initialValidationState?: boolean,
) => {
  const [value, setValue] = useState<T>(initialValue);
  const [lastValidValue, setLastValidValue] = useState<T | undefined>(
    validation(initialValue) ? initialValue : undefined,
  );
  const [valid, setValid] = useState<boolean>(
    typeof initialValidationState === 'boolean' ? initialValidationState : validation(initialValue),
  );

  const onChange = (val: T) => {
    if (validation(val)) {
      setLastValidValue(val);
      setValid(true);
    } else {
      setValid(false);
    }

    setValue(val);
  };

  return [{ value, lastValidValue, valid }, onChange] as const;
};
