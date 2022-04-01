import { combineReducers } from 'redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AsyncState } from '@common/store/helpers';
import { PaginatedHttpSuccessResponse } from '@common/types/api';

import { GetDebtorDebtsPayload } from './lenderDebtor.types';

export const getLenderDebtorMapKey = (lenderId: number, debtorId: number) =>
  `lender-${lenderId}_debtor-${debtorId}`;

export const getLenderDebtorDebtsSlice = createSlice({
  name: 'getDebtorDebts',
  initialState: {} as {
    [key: string]: AsyncState<PaginatedHttpSuccessResponse<number[]>, unknown>;
  },
  reducers: {
    request: (state, action: PayloadAction<GetDebtorDebtsPayload>) => {
      const { debtorId, lenderId } = action.payload;

      state[getLenderDebtorMapKey(lenderId, debtorId)] = {
        ...state[getLenderDebtorMapKey(lenderId, debtorId)],
        isProcessing: true,
      };
    },
    success: (
      state,
      {
        payload: { debtorId, lenderId, ...payload },
      }: PayloadAction<
        PaginatedHttpSuccessResponse<number[]> & {
          debtorId: number;
          lenderId: number;
        }
      >
    ) => {
      state[getLenderDebtorMapKey(lenderId, debtorId)] = {
        ...state[getLenderDebtorMapKey(lenderId, debtorId)],
        isProcessing: false,
        error: null,
        value: payload,
      };
    },
    error: (
      state,
      {
        payload: { debtorId, lenderId, ...payload },
      }: PayloadAction<
        unknown & {
          debtorId: number;
          lenderId: number;
        }
      >
    ) => {
      state[getLenderDebtorMapKey(lenderId, debtorId)] = {
        ...state[getLenderDebtorMapKey(lenderId, debtorId)],
        isProcessing: false,
        error: payload,
      };
    },
  },
});

export const lenderDebtorReducer = combineReducers({
  getLenderDebtorDebts: getLenderDebtorDebtsSlice.reducer,
});
