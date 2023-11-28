import { act, renderHook } from '@testing-library/react';

import { useDisclosure } from './use-disclosure';

describe('useDisclosure', () => {
  it('should return isOpen as false by default', () => {
    const { result } = renderHook(() => useDisclosure());
    expect(result.current.isOpen).toBe(false);
  });

  it('should return isOpen as true when defaultIsOpen is true', () => {
    const { result } = renderHook(() => useDisclosure({ defaultIsOpen: true }));
    expect(result.current.isOpen).toBe(true);
  });

  it('should return isOpen as true when isOpen is true', () => {
    const { result } = renderHook(() => useDisclosure({ isOpen: true }));
    expect(result.current.isOpen).toBe(true);
  });

  it('should return isOpen as false when isOpen is false', () => {
    const { result } = renderHook(() => useDisclosure({ isOpen: false }));
    expect(result.current.isOpen).toBe(false);
  });

  it('should call onOpen when onOpen is provided and onToggle is called', () => {
    const onOpen = jest.fn();
    const { result } = renderHook(() => useDisclosure({ onOpen }));
    act(() => {
      result.current.onToggle();
    });
    expect(onOpen).toHaveBeenCalled();
  });

  it('should call onClose when onClose is provided and onToggle is called', () => {
    const onClose = jest.fn();
    const { result } = renderHook(() => useDisclosure({ onClose, isOpen: true }));
    act(() => {
      result.current.onToggle();
    });
    expect(onClose).toHaveBeenCalled();
  });

  it('should not call onOpen when isOpen is controlled and onToggle is called', () => {
    const onOpen = jest.fn();
    const { result } = renderHook(() => useDisclosure({ onOpen, isOpen: true }));
    act(() => {
      result.current.onToggle();
    });
    expect(onOpen).not.toHaveBeenCalled();
  });

  it('should not call onClose when isOpen is controlled and onToggle is called', () => {
    const onClose = jest.fn();
    const { result } = renderHook(() => useDisclosure({ onClose, isOpen: false }));
    act(() => {
      result.current.onToggle();
    });
    expect(onClose).not.toHaveBeenCalled();
  });

  it('should return the correct button props', () => {
    const { result } = renderHook(() => useDisclosure({ isOpen: true }));
    const buttonProps = result.current.getButtonProps();
    expect(buttonProps['aria-expanded']).toBe(true);
    expect(buttonProps['aria-controls']).toBeDefined();
    expect(buttonProps.onClick).toBeDefined();
  });

  it('should return the correct disclosure props', () => {
    const { result } = renderHook(() => useDisclosure({ isOpen: true }));
    const disclosureProps = result.current.getDisclosureProps();
    expect(disclosureProps.hidden).toBe(false);
    expect(disclosureProps.id).toBeDefined();
  });
});
