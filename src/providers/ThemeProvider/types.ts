import type { ToasterProps } from '@/components/Toast';

export type Theme = 'dark' | 'light' | 'system';

export interface ThemeContextState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

/**
 * Props for the ThemeProvider component
 */
export interface ThemeProviderProps {
  /**
   * The child components to be wrapped by the ThemeProvider
   */
  children: React.ReactNode;
  /**
   * The default theme to be used if no theme is set in local storage
   */
  defaultTheme?: Theme;
  /**
   * The key to be used for storing the theme in local storage
   */
  storageKey?: string;
  /**
   * Props to be passed to the Toaster component
   */
  toasterProps?: ToasterProps;
}
