import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

import { ApiGetDebt, ApiGetDebtorDebts } from '@common/types/api/debt';
import { debtorsApi } from '@api/debtors';
import { usersSlice } from '@ducks/users/users.slice';
import { debtsSlice } from '@ducks/debts/debts.slice';

import { getLenderDebtorDebtsSlice } from './lenderDebtor.slice';
import { GetLenderDebtorDebtsPayload } from './lenderDebtor.types';

// TODO: implement normalizr

const fakeDebt: ApiGetDebt = {
  actualSum: 100,
  createdAt: '10.01.2022',
  expireDate: '11.01.2022',
  id: 1,
  initialSum: 1000,
  isExpired: false,
  isPaid: false,
  paymentStatus: 'IN_PROGRESS',
};

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

    data.push(
      fakeDebt,
      { ...fakeDebt, id: 2 },
      { ...fakeDebt, id: 3 },
      { ...fakeDebt, id: 4 },
      { ...fakeDebt, id: 5 },
      { ...fakeDebt, id: 6 },
      { ...fakeDebt, id: 7 },
      { ...fakeDebt, id: 8 },
      { ...fakeDebt, id: 9 },
      { ...fakeDebt, id: 10 }
    );

    const debtIds = data.map((debt) => debt.id);

    const debts = data.reduce(
      (accum, value) => ({ ...accum, [value.id]: value }),
      {}
    );

    yield put(debtsSlice.actions.fill(debts));

    yield put(
      usersSlice.actions.fill({
        [lenderId]: lenderUser,
        [debtorId]: debtorUser,
      })
    );

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
