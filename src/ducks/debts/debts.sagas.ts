import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';

import { debtorsApi } from '@api/debtors';
import { ApiCreateDebt } from '@common/types/api/debt';

import { createDebtSlice, payTheDebtOffSlice } from './debts.slice';
import { PayTheDebtOffPayload } from './debts.types';

function* createDebtSaga({ payload }: PayloadAction<ApiCreateDebt>) {
  try {
    yield call(debtorsApi.createDebtorDebt, payload);

    yield put(createDebtSlice.actions.success());
    yield put(createDebtSlice.actions.reset());
  } catch (error) {
    yield put(createDebtSlice.actions.error(error));
  }
}

function* payTheDebtOffSaga({ payload }: PayloadAction<PayTheDebtOffPayload>) {
  try {
    yield call(debtorsApi.payTheDebtOff, payload.debtId, payload.data);

    yield put(payTheDebtOffSlice.actions.success());
    yield put(payTheDebtOffSlice.actions.reset());
  } catch (error) {
    yield put(payTheDebtOffSlice.actions.error(error));
  }
}

export function* debtsSagas() {
  yield takeLatest(createDebtSlice.actions.request, createDebtSaga);
  yield takeLatest(payTheDebtOffSlice.actions.request, payTheDebtOffSaga);
}
