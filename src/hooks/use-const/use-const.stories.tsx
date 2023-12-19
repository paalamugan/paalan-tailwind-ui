import { useConst } from './use-const';

export default {
  title: 'Hooks/State Management/useConst',
};

export function WithValue() {
  const constantValue = useConst('Hello, world!');
  return <div>{constantValue}</div>;
}

export function WithFunction() {
  const constantValue = useConst(() => 'Hello, world!');
  return <div>{constantValue}</div>;
}
