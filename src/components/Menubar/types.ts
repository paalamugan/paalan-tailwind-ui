import type { MenubarCheckboxItem, MenubarItem, MenubarRadioItem, MenubarRoot, MenubarSeparator } from './Menubar';

export interface MenubarMenuItemProps extends React.ComponentPropsWithoutRef<typeof MenubarItem> {
  label: string;
  shortcut?: string;
  onClick?: () => void;
  subMenus?: MenubarMenuList[];
}

export interface MenubarMenuCheckboxItemProps extends React.ComponentPropsWithoutRef<typeof MenubarCheckboxItem> {
  type: 'checkbox';
  label: string;
}
export interface MenubarMenuRadioItemProps extends React.ComponentPropsWithoutRef<typeof MenubarRadioItem> {
  type: 'radio';
  value: string;
  options: { label: string; value: string }[];
}

export interface MenubarMenuSeparatorProps extends React.ComponentPropsWithoutRef<typeof MenubarSeparator> {
  separator: boolean;
}

export type MenubarMenuItemsProps =
  | MenubarMenuItemProps
  | MenubarMenuSeparatorProps
  | MenubarMenuCheckboxItemProps
  | MenubarMenuRadioItemProps;

export interface MenubarMenuList {
  label: string;
  items: MenubarMenuItemsProps[];
}

export interface MenubarProps extends Omit<React.ComponentPropsWithoutRef<typeof MenubarRoot>, 'children' | 'asChild'> {
  menus: MenubarMenuList[];
}
