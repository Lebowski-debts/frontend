import { combineReducers } from 'redux';

import { createAsyncSlice } from '@common/store/helpers';
import { PaginatedHttpSuccessResponse } from '@common/types/api';
import { ApiGetDebtor } from '@common/types/api/debtor';

import { GetDebtorsPayload } from './debtors.types';

export const getDebtorsSlice = createAsyncSlice<
  GetDebtorsPayload,
  PaginatedHttpSuccessResponse<ApiGetDebtor[]>,
  unknown
>({ name: 'getDebtors' });

export const debtorsReducer = combineReducers({
  getDebtors: getDebtorsSlice.reducer,
});
