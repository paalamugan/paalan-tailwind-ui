import { useColorScheme } from './use-color-scheme';

export default {
  title: 'Hooks/UI And Dom/useColorScheme',
};

export function Usage() {
  const colorScheme = useColorScheme();
  return (
    <div
      style={{
        backgroundColor: colorScheme === 'dark' ? '#333' : '#fff',
        color: colorScheme === 'dark' ? '#fff' : '#333',
      }}
    >
      <h1>Current color scheme: {colorScheme}</h1>
      <p>This is an example of how to use the useColorScheme hook.</p>
    </div>
  );
}
