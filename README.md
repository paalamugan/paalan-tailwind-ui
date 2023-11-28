# Paalan Tailwind UI

This is a collection of React components and hooks that used tailwindcss as CSS framework.

[Storybook Website](https://tailwind-ui-storybook.paalamugan.com/).

## Installation

- Node version >= 16.0.0 is required.

```bash
nvm install 18 && nvm use 18
```

- Install the package using npm. This package has peer dependencies on `react`, `react-dom` and `react-router-dom`.

```bash
npm install @paalan/tailwind-ui
```

## Usage

- Import the `tailwindConfig` configuration from `@paalan/tailwind-ui/config` in your application. Copy the below content and paste it in your application `tailwind.config.js` file.

```js
import { tailwindConfig } from '@paalan/tailwind-ui/config';

/** @type {import('tailwindcss').Config} */
const config = {
  presets: [tailwindConfig],
  // override tailwind config here if needed
  theme: {},
};

export default config;
```

- Import the styles css file from `@paalan/tailwind-ui/styles.css` in your application. Copy the below content and paste it in your application `index.css` file.

```css
@import '@paalan/tailwind-ui/styles.css';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

- Import the `ThemeProvider` component from `@paalan/tailwind-ui/providers` and wrap your application with it.

```jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@paalan/tailwind-ui/providers';

import { App } from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);

const Root = () => {
  return (
    <React.StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  );
};

root.render(<Root />);
```

- Import the components you need from `@paalan/tailwind-ui/components`.

```jsx
import React, { useState } from 'react';

import { Button } from '@paalan/tailwind-ui/components';
import { useCounter } from '@paalan/tailwind-ui/hooks';
import { Box, Text } from '@paalan/tailwind-ui/layouts';

export const App = () => {
  const [count, { increment, decrement }] = useCounter(0);
  return (
    <Box>
      <Text mb="2">Count: {count}</Text>
      <Button onClick={() => increment()} variant="outline" mr="2">
        Increment
      </Button>
      <Button onClick={() => decrement()} variant="outline">
        Decrement
      </Button>
    </Box>
  );
};
```

## How to import the provider hooks

- Import the provider hooks you need from `@paalan/tailwind-ui/providers`.

```jsx
import React from 'react';

import { Box, Text } from '@paalan/tailwind-ui/layouts';
import { useTheme } from '@paalan/tailwind-ui/providers';

export const App = () => {
  const { theme } = useTheme();

  return (
    <Box>
      <Text>Current theme is {theme}</Text>
    </Box>
  );
};
```

## How to import the general hooks

- Import the hooks you need from `@paalan/tailwind-ui/hooks`.

```jsx
import React from 'react';

import { Button } from '@paalan/tailwind-ui/components';
import { useToggle } from '@paalan/tailwind-ui/hooks';
import { Box, Text } from '@paalan/tailwind-ui/layouts';

export const App = () => {
  const [isOn, toggle] = useToggle();

  return (
    <Box>
      <Text>Current state is {isOn ? 'on' : 'off'}</Text>
      <Button onClick={toggle}>Toggle</Button>
    </Box>
  );
};
```

## How to import the icons

- Import the icons you need from `@paalan/tailwind-ui/icons`.

```jsx
import { AccessibilityIcon } from '@paalan/tailwind-ui/icons';

<AccessibilityIcon boxSize="4" />;
```

- Import the solid icons you need from `@paalan/tailwind-ui/icons/solid`. These icons are from [heroicons](https://heroicons.com/). So you can't use the `boxSize` prop on these icons.

```jsx
import { AcademicCapIcon } from '@paalan/tailwind-ui/icons/solid';

<AcademicCapIcon className="h-4 w-4" />;
```

- Import the outline icons you need from `@paalan/tailwind-ui/icons/outline`. These icons are from [heroicons](https://heroicons.com/). So you can't use the `boxSize` prop on these icons.

```jsx
import { AcademicCapIcon } from '@paalan/tailwind-ui/icons/outline';

<AcademicCapIcon className="h-4 w-4" />;
```

## Documentation

- [Layouts](https://tailwind-ui-storybook.paalamugan.com/?path=/docs/layouts-box--docs)
- [Components](https://tailwind-ui-storybook.paalamugan.com/?path=/docs/components-accordion--docs)
- [Icons](https://tailwind-ui-storybook.paalamugan.com/?path=/docs/system-icons--docs)
- [Colors](https://tailwind-ui-storybook.paalamugan.com/?path=/docs/system-colors--docs)
- [Hooks](https://tailwind-ui-storybook.paalamugan.com/?path=/docs/hooks-state-management-usecallbackref--documentation)
- [Providers](https://tailwind-ui-storybook.paalamugan.com/?path=/docs/providers-themeprovider--docs)
