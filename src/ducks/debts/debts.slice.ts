import { combineReducers } from 'redux';

import { createAsyncSlice } from '@common/store/helpers';
import { ApiGetDebtorDebts } from '@common/types/api/debt';

import { GetDebtorDebtsPayload } from './debts.types';

export const getDebtorDebtsSlice = createAsyncSlice<
  GetDebtorDebtsPayload,
  ApiGetDebtorDebts,
  unknown
>({
  name: 'getDebtorDebts',
});

export const debtsReducer = combineReducers({
  getDebtorDebts: getDebtorDebtsSlice.reducer,
});
