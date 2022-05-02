import { useEffect, useRef } from 'react';

export const useOnUnmount = (cleanupCallback: () => void) => {
  const callbackRef = useRef(cleanupCallback);
  callbackRef.current = cleanupCallback;
  useEffect(() => {
    return () => callbackRef.current();
  }, []);
};
