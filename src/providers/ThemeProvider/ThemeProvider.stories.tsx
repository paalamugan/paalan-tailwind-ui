import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/components/Button';
import { Heading, HStack, Stack } from '@/layouts';

import { useTheme } from './context';
import { ThemeProvider } from './ThemeProvider';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'providers/ThemeProvider',
  component: ThemeProvider,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'padded',
  },
  argTypes: {},
} satisfies Meta<typeof ThemeProvider>;

export default meta;

type Story = StoryObj<typeof ThemeProvider>;

export const Basic: Story = {
  render: (args) => {
    const App = () => {
      const { theme, setTheme } = useTheme();

      return (
        <Stack as="section" gap="4" id="theme-provider">
          <Heading>Current Theme: {theme}</Heading>
          <HStack>
            <Button onClick={() => setTheme('dark')} variant="outline">
              Dark
            </Button>
            <Button onClick={() => setTheme('light')} variant="outline">
              Light
            </Button>
            <Button onClick={() => setTheme('system')} variant="outline">
              System
            </Button>
          </HStack>
        </Stack>
      );
    };
    return (
      <ThemeProvider {...args}>
        <App />
      </ThemeProvider>
    );
  },

  args: {
    defaultTheme: 'light',
  },
};

setTimeout(() => {
  const themeProvider = document.getElementById('theme-provider');
  const buttons = themeProvider?.querySelectorAll('button') || [];
  const themeIcon = window.parent.document.querySelector<HTMLButtonElement>(
    'button[title="toggle dark mode for tailwind"]',
  );

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const theme = button.innerText.toLowerCase();
      const defaultTheme = window.localStorage.getItem('paalan-ui-theme');

      if (theme === 'system') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const searchParams = new URLSearchParams(window.location.search);
        const globalsQueryParam = searchParams.get('globals') || '';
        const isDarkQueryParam = globalsQueryParam.includes('twDarkMode:!true');
        if (isDark && isDarkQueryParam) return;
      }

      if (defaultTheme === theme) return;
      themeIcon?.click();
    });
  });
}, 1500);
