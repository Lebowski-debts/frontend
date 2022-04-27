import { combineReducers } from 'redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AsyncState } from '@common/store/helpers';
import { PaginatedHttpSuccessResponse } from '@common/types/api';

import { GetLenderDebtorDebtsPayload } from './lenderDebtor.types';

export const getLenderDebtorMapKey = (lenderId: number, debtorId: number) =>
  `lender-${lenderId}_debtor-${debtorId}`;

export const getLenderDebtorDebtsSlice = createSlice({
  name: 'getDebtorDebts',
  initialState: {} as {
    [key: string]: AsyncState<PaginatedHttpSuccessResponse<number[]>, unknown>;
  },
  reducers: {
    request: (state, action: PayloadAction<GetLenderDebtorDebtsPayload>) => {
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
        value: {
          ...payload,
          data: Array.from(
            new Set([
              ...(state[getLenderDebtorMapKey(lenderId, debtorId)].value
                ?.data || []),
              ...payload.data,
            ])
          ),
        },
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
    reset: (
      state,
      {
        payload: { debtorId, lenderId },
      }: PayloadAction<{ debtorId: number; lenderId: number }>
    ) => {
      state[getLenderDebtorMapKey(lenderId, debtorId)] = {
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
