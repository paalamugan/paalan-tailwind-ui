import type { MenubarMenuCheckboxItemProps, MenubarMenuRadioItemProps, MenubarMenuSeparatorProps } from './types';

export const isMenubarMenuSeparator = (menu: unknown): menu is MenubarMenuSeparatorProps => {
  return 'separator' in (menu as MenubarMenuSeparatorProps);
};

export const isMenubarMenuCheckbox = (menu: unknown): menu is MenubarMenuCheckboxItemProps => {
  return (menu as MenubarMenuCheckboxItemProps).type === 'checkbox';
};

export const isMenubarMenuRadio = (menu: unknown): menu is MenubarMenuRadioItemProps => {
  return (menu as MenubarMenuRadioItemProps).type === 'radio';
};
