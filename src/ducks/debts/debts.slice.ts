import { combineReducers } from 'redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NormalizedListValues } from '@common/types/api';
import { ApiCreateDebt, ApiGetDebt } from '@common/types/api/debt';
import { createAsyncSlice } from '@common/store/helpers';

import { PayTheDebtOffPayload } from './debts.types';

const initialState: { entities: { [key: number]: ApiGetDebt } } = {
  entities: {},
};

export const debtsSlice = createSlice({
  name: 'fillDebts',
  initialState,
  reducers: {
    fill: (state, action: PayloadAction<NormalizedListValues<ApiGetDebt>>) => {
      state.entities = action.payload;
    },
  },
});

export const createDebtSlice = createAsyncSlice<ApiCreateDebt>({
  name: 'createDebt',
});

export const payTheDebtOffSlice = createAsyncSlice<PayTheDebtOffPayload>({
  name: 'payTheDebtOff',
});

export const debtsReducer = combineReducers({
  debts: debtsSlice.reducer,
  createDebt: createDebtSlice.reducer,
  payTheDebtOff: payTheDebtOffSlice.reducer,
});
