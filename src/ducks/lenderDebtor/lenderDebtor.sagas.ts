import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

import { ApiGetDebtorDebts } from '@common/types/api/debt';
import { debtorsApi } from '@api/debtors';
import { usersSlice } from '@ducks/users/users.slice';
import { debtsSlice } from '@ducks/debts/debts.slice';

import { getLenderDebtorDebtsSlice } from './lenderDebtor.slice';
import { GetLenderDebtorDebtsPayload } from './lenderDebtor.types';

function* getLenderDebtorDebtsSaga(
  action: PayloadAction<GetLenderDebtorDebtsPayload>
) {
  const { lenderId, debtorId, ...params } = action.payload;

  try {
    const {
      data: { data, lenderUser, debtorUser, ...paginationData },
    } = (yield call(
      debtorsApi.getDebotrDebts,
      lenderId,
      debtorId,
      params
    )) as AxiosResponse<ApiGetDebtorDebts>;

    const debtIds = data.map((debt) => debt.id);

    const debts = data.reduce(
      (accum, value) => ({ ...accum, [value.id]: value }),
      {}
    );

    yield put(debtsSlice.actions.fill(debts));

    if (lenderUser && debtorUser) {
      yield put(
        usersSlice.actions.fill({
          [lenderId]: lenderUser,
          [debtorId]: debtorUser,
        })
      );
    }

    yield put(
      getLenderDebtorDebtsSlice.actions.success({
        ...paginationData,
        debtorId,
        lenderId,
        data: debtIds,
      })
    );
  } catch (error) {
    yield put(
      getLenderDebtorDebtsSlice.actions.error({
        lenderId,
        debtorId,
        ...((error as { [key: string]: unknown }) || {}),
      })
    );
  }
}

export function* lenderDebtorSagas() {
  yield takeLatest(
    getLenderDebtorDebtsSlice.actions.request,
    getLenderDebtorDebtsSaga
  );
}
