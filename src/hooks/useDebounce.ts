'use client';

import { useEffect, useRef, useCallback } from 'react';

type Callback = (...args: any[]) => void;

interface UseDebounceOptions {
  delay?: number;
}

export const useDebounce = <T extends Callback>(
  callback: T,
  options: UseDebounceOptions = {},
): [T, () => void] => {
  const { delay = 500 } = options;
  const timeoutRef = useRef<NodeJS.Timeout>();

  const debouncedCallback = useCallback(
    ((...args: any[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    }) as T,
    [callback, delay],
  );

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return [debouncedCallback, cancel];
};
