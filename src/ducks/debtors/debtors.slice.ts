import { combineReducers } from 'redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AsyncState, createAsyncSlice } from '@common/store/helpers';
import {
  NormalizedList,
  PaginatedHttpSuccessResponse,
} from '@common/types/api';
import { ApiGetDebtorDebtsCommonInfo } from '@common/types/api/debtor';
import { GetDebtorDebtsPayload } from '@ducks/debts/debts.types';

import { GetDebtorsPayload } from './debtors.types';

export const getDebtorsSlice = createAsyncSlice<
  GetDebtorsPayload,
  PaginatedHttpSuccessResponse<
    NormalizedList<ApiGetDebtorDebtsCommonInfo, number>
  >
>({
  name: 'getDebtors',
  reducers: {
    success: (
      state,
      action: PayloadAction<
        PaginatedHttpSuccessResponse<
          NormalizedList<ApiGetDebtorDebtsCommonInfo, number>
        >
      >
    ) => {
      state.isProcessing = false;
      state.isSuccess = true;
      state.value = {
        ...state.value,
        data: {
          entities: {
            ...state.value?.data.entities,
            ...action.payload.data.entities,
          },
          keys: Array.from(
            new Set([
              ...(state.value?.data.keys || []),
              ...action.payload.data.keys,
            ])
          ),
        },
      } as PaginatedHttpSuccessResponse<
        NormalizedList<ApiGetDebtorDebtsCommonInfo, number>
      >;

      state.error = null;
    },
  },
});

export const getLenderDebtorMapKey = (debtorId: number) => `debtor-${debtorId}`;

export const getDebtorDebtsSlice = createSlice({
  name: 'getDebtorDebts',
  initialState: {} as {
    [key: string]: AsyncState<PaginatedHttpSuccessResponse<number[]>, unknown>;
  },
  reducers: {
    request: (state, action: PayloadAction<GetDebtorDebtsPayload>) => {
      const { debtorId } = action.payload;

      state[getLenderDebtorMapKey(debtorId)] = {
        ...state[getLenderDebtorMapKey(debtorId)],
        isProcessing: true,
      };
    },
    success: (
      state,
      {
        payload: { debtorId, ...payload },
      }: PayloadAction<
        PaginatedHttpSuccessResponse<number[]> & {
          debtorId: number;
        }
      >
    ) => {
      state[getLenderDebtorMapKey(debtorId)] = {
        ...state[getLenderDebtorMapKey(debtorId)],
        isProcessing: false,
        error: null,
        value: {
          ...payload,
          data: Array.from(
            new Set([
              ...(state[getLenderDebtorMapKey(debtorId)].value?.data || []),
              ...payload.data,
            ])
          ),
        },
      };
    },
    error: (
      state,
      {
        payload: { debtorId, ...payload },
      }: PayloadAction<
        unknown & {
          debtorId: number;
        }
      >
    ) => {
      state[getLenderDebtorMapKey(debtorId)] = {
        ...state[getLenderDebtorMapKey(debtorId)],
        isProcessing: false,
        error: payload,
      };
    },
    reset: (
      state,
      { payload: { debtorId } }: PayloadAction<{ debtorId: number }>
    ) => {
      state[getLenderDebtorMapKey(debtorId)] = {
        isSuccess: false,
        error: null,
        isProcessing: false,
      };
    },
  },
});

export const debtorsReducer = combineReducers({
  getDebtors: getDebtorsSlice.reducer,
  getDebtorDebts: getDebtorDebtsSlice.reducer,
});
