import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';

import { debtorsApi } from '@api/debtors';
import { ApiCreateDebt } from '@common/types/api/debt';

import { createDebtSlice } from './debts.slice';

function* createDebtSaga({ payload }: PayloadAction<ApiCreateDebt>) {
  try {
    yield call(debtorsApi.createDebtorDebt, payload);

    yield put(createDebtSlice.actions.success());
  } catch (error) {
    yield put(createDebtSlice.actions.error(error));
  }
}

export function* debtsSagas() {
  yield takeLatest(createDebtSlice.actions.request, createDebtSaga);
}
