import { ApiError, ApiUser } from '@common/types/api';
import { createAsyncSlice } from '@common/store/helpers';

export const exampleSlice = createAsyncSlice<undefined, ApiUser, ApiError>({
  name: 'getUsers',
});
