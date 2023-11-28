import { renderHook, waitFor } from '@testing-library/react';

import { patchConsoleError } from '@/utils';

import { useQueryFetcher } from './use-query-fetcher';

describe('useQueryFetcher', () => {
  const fetcher = jest.fn().mockResolvedValue('data');

  beforeEach(() => {
    fetcher.mockClear();
  });

  it('fetches data on mount', async () => {
    const { result } = renderHook(() => useQueryFetcher(fetcher));

    expect(fetcher).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });

  it('fetches data on refetch', async () => {
    const { result } = renderHook(() => useQueryFetcher(fetcher));

    expect(fetcher).toHaveBeenCalledTimes(1);

    fetcher.mockResolvedValueOnce('data2');

    await result.current.refetch();
    expect(fetcher).toHaveBeenCalledTimes(2);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });

  it('skips fetch on mount when skip is true', () => {
    renderHook(() => useQueryFetcher(fetcher, { skip: true }));

    expect(fetcher).toHaveBeenCalledTimes(0);
  });

  it('fetch on refetch when skip is true', async () => {
    const { result } = renderHook(() => useQueryFetcher(fetcher, { skip: true }));

    await result.current.refetch();

    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it('passes parameter to fetcher', async () => {
    const { result } = renderHook(() => useQueryFetcher(fetcher, { id: 1, skip: false }));

    expect(fetcher).toHaveBeenCalledWith({ id: 1, skip: false });

    fetcher.mockResolvedValueOnce('data2');
    await result.current.refetch({ id: 2 });
    expect(fetcher).toHaveBeenCalledWith({ id: 2 });
    await waitFor(() => expect(result.current.data).toBeNull());
  });

  it('does not pass skip parameter to fetcher', async () => {
    const { result } = renderHook(() => useQueryFetcher(fetcher));

    fetcher.mockResolvedValueOnce('data');
    await result.current.refetch();

    expect(fetcher).toHaveBeenCalledTimes(2);

    expect(fetcher).not.toHaveBeenCalledWith({ skip: false });
    await waitFor(() => {
      expect(result.current.data).toBeDefined();
    });
  });

  it('returns loading status', async () => {
    const { result } = renderHook(() => useQueryFetcher(fetcher));

    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));
  });

  it('returns data after successful fetch', async () => {
    fetcher.mockResolvedValueOnce('data');

    const { result } = renderHook(() => useQueryFetcher(fetcher));
    await waitFor(() => {
      expect(result.current.data).toBe('data');
    });
  });

  it('returns error after failed fetch', async () => {
    patchConsoleError();
    const error = new Error('error');
    fetcher.mockRejectedValueOnce(error);

    const { result } = renderHook(() => useQueryFetcher(fetcher));
    await waitFor(() => {
      expect(result.current.error).toBe(error);
    });
    patchConsoleError.release();
  });

  it('returns initialized status', async () => {
    const { result } = renderHook(() => useQueryFetcher(fetcher));

    expect(result.current.initialized).toBe(false);
    await waitFor(() => {
      expect(result.current.initialized).toBe(true);
    });
  });
});
