'use client';

import { useState, useCallback } from 'react';

interface UseAsyncOptions<T> {
  initialData?: T;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

export const useAsync = <T, E = Error>(
  fn: () => Promise<T>,
  options?: UseAsyncOptions<T>,
) => {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [data, setData] = useState<T | undefined>(options?.initialData);
  const [error, setError] = useState<E | null>(null);

  const execute = useCallback(async () => {
    setStatus('pending');
    setError(null);

    try {
      const result = await fn();
      setData(result);
      setStatus('success');
      options?.onSuccess?.(result);
      return result;
    } catch (err) {
      const error = err as E;
      setError(error);
      setStatus('error');
      options?.onError?.(error as any);
      throw error;
    }
  }, [fn, options]);

  const reset = useCallback(() => {
    setStatus('idle');
    setData(options?.initialData);
    setError(null);
  }, [options]);

  return { execute, reset, status, data, error };
};
