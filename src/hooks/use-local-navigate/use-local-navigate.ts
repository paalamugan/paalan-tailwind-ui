import type { NavigateOptions } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

type GetParamFromPathResult<TParam extends PropertyKey> = { [key in TParam]: string };
type GetParamFromPath<TPath extends string> = TPath extends `${string}:${infer TParam}/${infer TRest}`
  ? GetParamFromPathResult<TParam> & GetParamFromPath<TRest>
  : TPath extends `${string}:${infer TParam}`
    ? GetParamFromPathResult<TParam>
    : unknown;

/**
 * The `useLocalNavigate` function is a custom hook that provides a wrapper around the `useNavigate`
 * hook in React Router to handle navigation with dynamic parameters and query strings.
 *  @example Example usage:
 * ```
 * const navigate = useLocalNavigate();
 * navigate('/path/:id', { params: { id: '123' }, query: { foo: 'bar' } });
 * ```
 * @returns The function `customNavigate` is being returned.
 */
export const useLocalNavigate = () => {
  const navigate = useNavigate();
  const customNavigate = <TPath extends string>(
    path: TPath,
    options?: NavigateOptions & { params?: GetParamFromPath<TPath>; query?: Record<string, string>; hash?: string },
  ) => {
    const { params, query, hash, ...rest } = options || { params: {}, query: {} };

    const paramEntries = Object.entries<string>(params || {});
    const pathWithParams = paramEntries.reduce((acc: string, [key, value]) => {
      return acc.replace(`:${key}`, value);
    }, path);

    const queryEntries = Object.entries<string>(query || {});
    const queryString = queryEntries.reduce((acc: string, [key, value]) => {
      return `${acc}${acc ? '&' : '?'}${key}=${value}`;
    }, '');

    navigate(`${pathWithParams}${queryString}${hash ? `#${hash}` : ''}`, rest);
  };

  return customNavigate;
};
