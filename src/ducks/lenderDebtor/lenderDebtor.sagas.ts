import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { normalize, schema } from 'normalizr';
import { call, put, takeEvery } from 'redux-saga/effects';

import { debtorsApi } from '@api/debtors';
import { NormalizedListValues } from '@common/types/api';
import { ApiGetDebt, ApiGetDebtorDebts } from '@common/types/api/debt';
import { ApiGetUser } from '@common/types/api/user';
import { debtsSlice } from '@ducks/debts/debts.slice';
import { userSchema } from '@ducks/users/users.schemas';
import { usersSlice } from '@ducks/users/users.slice';

import { getLenderDebtorDebtsSlice } from './lenderDebtor.slice';
import { GetLenderDebtorDebtsPayload } from './lenderDebtor.types';

function* getLenderDebtorDebtsSaga({
  payload,
}: PayloadAction<GetLenderDebtorDebtsPayload>) {
  const { lenderId, debtorId, ...params } = payload;

  try {
    const { data } = (yield call(
      debtorsApi.getDebtorDebts,
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
        lenderId,
        debtorId,
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
  yield takeEvery(
    getLenderDebtorDebtsSlice.actions.request,
    getLenderDebtorDebtsSaga
  );
}
