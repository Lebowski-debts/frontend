import { useEffect } from 'react';

import { isSuccess, _AsyncState } from '@common/store/helpers';

export const useOnSuccess = (
  callBack: () => void,
  asyncState: _AsyncState<unknown, unknown>
) => {
  useEffect(() => {
    if (isSuccess(asyncState)) {
      callBack();
    }
  }, [asyncState]);
};
