import { useEffect, useRef } from 'react';

export const useEffectMounted = (callBack: () => void, deps?: unknown[]) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      callBack();
      return;
    }

    didMount.current = true;
  }, deps);
};
