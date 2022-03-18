import { combineReducers } from 'redux';

import { createAsyncSlice } from '@common/store/helpers';
import {
  NormalizedList,
  PaginatedHttpSuccessResponse,
} from '@common/types/api';
import { ApiGetDebtorDebtsCommonInfo } from '@common/types/api/debtor';

import { GetDebtorsPayload } from './debtors.types';

export const getDebtorsSlice = createAsyncSlice<
  GetDebtorsPayload,
  PaginatedHttpSuccessResponse<
    NormalizedList<ApiGetDebtorDebtsCommonInfo, number>
  >
>({ name: 'getDebtors' });

export const debtorsReducer = combineReducers({
  getDebtors: getDebtorsSlice.reducer,
});
