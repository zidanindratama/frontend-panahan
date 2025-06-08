import { useRef, useCallback } from "react";

export function useThrottle<Args extends unknown[]>(
  callback: (...args: Args) => void,
  delay: number
): (...args: Args) => void {
  const lastRan = useRef<number>(Date.now());
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(
    (...args: Args) => {
      const now = Date.now();
      const remaining = delay - (now - lastRan.current);

      if (remaining <= 0) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        callback(...args);
        lastRan.current = now;
      } else {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          callback(...args);
          lastRan.current = Date.now();
        }, remaining);
      }
    },
    [callback, delay]
  );
}
