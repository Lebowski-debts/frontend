import { createSlice, PayloadAction, combineReducers } from '@reduxjs/toolkit';

import { AsyncState } from '@common/store/helpers';
import { PaginatedHttpSuccessResponse } from '@common/types/api';

import {
  GetLenderDebtorDebtsPayload,
  LenderDebtorActionProps,
} from './lenderDebtor.types';

export const getLenderDebtorMapKey = (lenderId: number, debtorId: number) =>
  `lender-${lenderId}-debtor-${debtorId}`;

export const getLenderDebtorDebtsSlice = createSlice({
  name: 'getLenderDebtorDebts',
  initialState: {} as {
    [key: string]: AsyncState<PaginatedHttpSuccessResponse<number[]>, unknown>;
  },
  reducers: {
    request: (
      state,
      {
        payload: { lenderId, debtorId },
      }: PayloadAction<GetLenderDebtorDebtsPayload>
    ) => {
      const key = getLenderDebtorMapKey(lenderId, debtorId);

      state[key] = {
        ...state[key],
        isProcessing: true,
      };
    },
    success: (
      state,
      {
        payload: { debtorId, lenderId, ...payload },
      }: PayloadAction<
        PaginatedHttpSuccessResponse<number[]> & LenderDebtorActionProps
      >
    ) => {
      const key = getLenderDebtorMapKey(lenderId, debtorId);

      state[key] = {
        ...state[key],
        isProcessing: false,
        error: null,
        value: {
          ...payload,
          data: Array.from(
            new Set([...(state[key].value?.data || []), ...payload.data])
          ),
        },
      };
    },
    error: (
      state,
      {
        payload: { debtorId, lenderId, ...payload },
      }: PayloadAction<unknown & LenderDebtorActionProps>
    ) => {
      const key = getLenderDebtorMapKey(lenderId, debtorId);

      state[key] = {
        ...state[key],
        isProcessing: false,
        error: payload,
      };
    },
    reset: (
      state,
      {
        payload: { debtorId, lenderId },
      }: PayloadAction<LenderDebtorActionProps>
    ) => {
      const key = getLenderDebtorMapKey(lenderId, debtorId);

      state[key] = {
        isSuccess: false,
        error: null,
        isProcessing: false,
      };
    },
  },
});

export const lenderDebtorReducer = combineReducers({
  getLenderDebtorDebts: getLenderDebtorDebtsSlice.reducer,
});
