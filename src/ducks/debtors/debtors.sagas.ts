import { AxiosResponse } from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery } from 'redux-saga/effects';

import { debtorsApi } from '@api/debtors';
import { PaginatedHttpSuccessResponse } from '@common/types/api';
import { ApiGetDebtor } from '@common/types/api/debtor';

import { GetDebtorsPayload } from './debtors.types';
import { getDebtorsSlice } from './debtors.slice';

// const fakeDebtor = {
//   debtsInfo: {
//     actualSum: 100,
//     count: 2,
//     firstDebtDate: '10.10.2019',
//     hasExpiredDebts: true,
//     initialSum: 10,
//     lastDebtDate: '10.10.2020',
//   },
//   user: {
//     createdAt: '',
//     id: 23,
//     telegramUserId: 12,
//     updatedAt: '15.10.10',
//     nickname: 'afarshartov',
//   },
// };

function* getDebtorsSaga({ payload }: PayloadAction<GetDebtorsPayload>) {
  try {
    const { userId, ...params } = payload;
    const response: AxiosResponse<
      PaginatedHttpSuccessResponse<ApiGetDebtor[]>
    > = (yield call(debtorsApi.getDebtors, userId, params)) as AxiosResponse<
      PaginatedHttpSuccessResponse<ApiGetDebtor[]>
    >;

    // response.data.data.push(
    //   fakeDebtor,
    //   fakeDebtor,
    //   fakeDebtor,
    //   fakeDebtor,
    //   fakeDebtor,
    //   fakeDebtor,
    //   fakeDebtor
    // );

    yield put(getDebtorsSlice.actions.success(response.data));
  } catch (error) {
    yield put(getDebtorsSlice.actions.error(error));
  }
}

export function* debtorsSagas() {
  yield takeEvery(getDebtorsSlice.actions.request, getDebtorsSaga);
}
