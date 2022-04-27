import { combineReducers } from 'redux';
import { PayloadAction } from '@reduxjs/toolkit';

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

export const debtorsReducer = combineReducers({
  getDebtors: getDebtorsSlice.reducer,
});
