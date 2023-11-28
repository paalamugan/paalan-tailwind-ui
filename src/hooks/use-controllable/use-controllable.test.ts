import { act, renderHook } from '@testing-library/react';

import { useControllableProp, useControllableState } from './use-controllable';

describe('useControllableProp', () => {
  it('should return controlled value when prop is defined', () => {
    const propValue = 'controlled value';
    const stateValue = 'uncontrolled value';
    const { result } = renderHook(() => useControllableProp(propValue, stateValue));
    expect(result.current[0]).toBe(true);
    expect(result.current[1]).toBe(propValue);
  });

  it('should return uncontrolled value when prop is undefined', () => {
    const propValue = undefined;
    const stateValue = 'uncontrolled value';
    const { result } = renderHook(() => useControllableProp(propValue, stateValue));
    expect(result.current[0]).toBe(false);
    expect(result.current[1]).toBe(stateValue);
  });
});

describe('useControllableState', () => {
  it('should return default value when value prop is undefined', () => {
    const defaultValue = 'default value';
    const { result } = renderHook(() => useControllableState({ defaultValue }));
    expect(result.current[0]).toBe(defaultValue);
  });

  it('should return value prop when it is defined', () => {
    const valueProp = 'value prop';
    const defaultValue = 'default value';
    const { result } = renderHook(() => useControllableState({ value: valueProp, defaultValue }));
    expect(result.current[0]).toBe(valueProp);
  });

  it('should update state when setValue is called', () => {
    const defaultValue = 'default value';
    const { result } = renderHook(() => useControllableState({ defaultValue }));
    const [_value, setValue] = result.current;
    const newValue = 'new value';
    act(() => setValue(newValue));
    expect(result.current[0]).toBe(newValue);
  });

  it('should call onChange when setValue is called', () => {
    const defaultValue = 'default value';
    const onChange = jest.fn();
    const { result } = renderHook(() => useControllableState({ defaultValue, onChange }));
    const [_value, setValue] = result.current;
    const newValue = 'new value';
    act(() => setValue(newValue));
    expect(onChange).toHaveBeenCalledWith(newValue);
  });

  it('should not update state or call onChange when shouldUpdate returns false', () => {
    const defaultValue = 'default value';
    const onChange = jest.fn();
    const shouldUpdate = jest.fn(() => false);
    const { result } = renderHook(() => useControllableState({ defaultValue, onChange, shouldUpdate }));
    const [_value, setValue] = result.current;
    const newValue = 'new value';
    act(() => setValue(newValue));
    expect(result.current[0]).toBe(defaultValue);
    expect(onChange).not.toHaveBeenCalled();
  });
});
