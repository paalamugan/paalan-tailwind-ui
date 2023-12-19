import { useLocalNavigate } from './use-local-navigate';

export default { title: 'Hooks/Utilities/useLocalNavigate' };

export function Usage() {
  const navigate = useLocalNavigate();
  navigate('/path/:id', { params: { id: '123' }, query: { foo: 'bar' } }); // => /path/123?foo=bar
  navigate('/path/:id', { params: { id: '123' }, query: { foo: 'bar' }, hash: 'baz' }); // => /path/123?foo=bar#baz
  navigate('/path/:accountId/:id', { params: { accountId: '123', id: '456' } }); // => /path/123/456
  return null;
}
