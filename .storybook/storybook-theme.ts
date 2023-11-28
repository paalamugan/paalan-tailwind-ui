import { create } from '@storybook/theming';

import brandImage from './storybook-logo.png';

const getCurrentTheme = () => {
  const search = window.location.search;
  const searchParams = new URLSearchParams(search);
  const globals = searchParams.get('globals') ?? '';
  const isDark = globals.includes('twDarkMode:!true');

  if (isDark) {
    localStorage.setItem('paalan-ui-theme', 'dark');
  } else {
    localStorage.setItem('paalan-ui-theme', 'light');
  }
  return isDark ? 'dark' : 'light';
};

export default create({
  base: getCurrentTheme(),
  brandTitle: 'Paalan Tailwind UI',
  brandUrl: 'https://paalamugan.com',
  brandImage,
});
