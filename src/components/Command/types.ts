export interface CommandGroupItem {
  /**
   * Optional icon to display for the command item
   */
  icon?: React.ReactNode;
  /**
   * The label for the command item
   */
  label: string;
  /**
   * Optional shortcut to display for the command item
   */
  shortcut?: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * Optional id for the command item
   */
  className?: string;
}

export interface CommandGroupList {
  /**
   * The heading for the command group
   */
  heading: string;
  /**
   * The items for the command group
   */
  items: CommandGroupItem[];
  /**
   * Optional className for the command group
   */
  className?: string;
}
