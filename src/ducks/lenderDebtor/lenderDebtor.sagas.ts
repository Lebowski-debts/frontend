import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { normalize, schema } from 'normalizr';

import { ApiGetDebt, ApiGetDebtorDebts } from '@common/types/api/debt';
import { debtorsApi } from '@api/debtors';
import { usersSlice } from '@ducks/users/users.slice';
import { debtsSlice } from '@ducks/debts/debts.slice';
import { ApiGetUser } from '@common/types/api/user';
import { NormalizedListValues } from '@common/types/api';
import { userSchema } from '@ducks/users/users.schemas';

import { getLenderDebtorDebtsSlice } from './lenderDebtor.slice';
import { GetLenderDebtorDebtsPayload } from './lenderDebtor.types';

function* getLenderDebtorDebtsSaga(
  action: PayloadAction<GetLenderDebtorDebtsPayload>
) {
  const { lenderId, debtorId, ...params } = action.payload;

  try {
    const { data } = (yield call(
      debtorsApi.getDebotrDebts,
      lenderId,
      debtorId,
      params
    )) as AxiosResponse<ApiGetDebtorDebts>;

    const { data: debtsData, lenderUser, debtorUser, ...paginationData } = data;

    const debtSchema = new schema.Entity('debts');

    const dataSchema = new schema.Object({
      data: [debtSchema],
      lenderUser: userSchema,
      debtorUser: userSchema,
    });

    const normalizedData = normalize<
      ApiGetDebtorDebts,
      {
        user: NormalizedListValues<ApiGetUser>;
        debts: NormalizedListValues<ApiGetDebt>;
      },
      { data: number[] }
    >(data, dataSchema);

    const {
      entities: { debts, user },
      result: { data: debtIds },
    } = normalizedData;

    yield put(debtsSlice.actions.fill(debts));

    if (user) {
      yield put(usersSlice.actions.fill(user));
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
