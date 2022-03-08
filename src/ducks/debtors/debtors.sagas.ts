import { AxiosResponse } from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery } from 'redux-saga/effects';

import { debtorsApi } from '@api/debtors';
import { PaginatedHttpSuccessResponse } from '@common/types/api';
import { ApiGetDebtor } from '@common/types/api/debtor';

import { GetDebtorsPayload } from './debtors.types';
import { getDebtorsSlice } from './debtors.slice';

function* getDebtorsSaga({ payload }: PayloadAction<GetDebtorsPayload>) {
  try {
    const { userId, ...params } = payload;
    const response: AxiosResponse<
      PaginatedHttpSuccessResponse<ApiGetDebtor[]>
    > = (yield call(debtorsApi.getDebtors, userId, params)) as AxiosResponse<
      PaginatedHttpSuccessResponse<ApiGetDebtor[]>
    >;

    yield put(getDebtorsSlice.actions.success(response.data));
  } catch (error) {
    yield put(getDebtorsSlice.actions.error(error));
  }
}

export function* debtorsSagas() {
  yield takeEvery(getDebtorsSlice.actions.request, getDebtorsSaga);
}
