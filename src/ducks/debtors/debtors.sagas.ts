import { AxiosResponse } from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery } from 'redux-saga/effects';
import { normalize, schema } from 'normalizr';

import { debtorsApi } from '@api/debtors';
import {
  NormalizedListValues,
  PaginatedHttpSuccessResponse,
} from '@common/types/api';
import {
  ApiGetDebtor,
  ApiGetDebtorDebtsCommonInfo,
} from '@common/types/api/debtor';
import { usersSlice } from '@ducks/users/users.slice';
import { ApiGetUser } from '@common/types/api/user';
import { GetDebtorDebtsPayload } from '@ducks/debts/debts.types';
import { ApiGetDebt, ApiGetDebtorDebts } from '@common/types/api/debt';
import { userSchema } from '@ducks/users/users.schemas';
import { debtsSlice } from '@ducks/debts/debts.slice';

import { debtorsSchema } from './debtors.schemas';
import { getDebtorDebtsSlice, getDebtorsSlice } from './debtors.slice';
import { GetDebtorsPayload } from './debtors.types';

function* getDebtorsSaga({ payload }: PayloadAction<GetDebtorsPayload>) {
  try {
    const { userId, ...params } = payload;
    const {
      data: { data, ...paginationParams },
    }: AxiosResponse<PaginatedHttpSuccessResponse<ApiGetDebtor[]>> =
      (yield call(debtorsApi.getDebtors, userId, params)) as AxiosResponse<
        PaginatedHttpSuccessResponse<ApiGetDebtor[]>
      >;

    const normalizedDebtorsList = normalize<
      ApiGetDebtor,
      {
        user: NormalizedListValues<ApiGetUser>;
        debtsInfo: NormalizedListValues<ApiGetDebtorDebtsCommonInfo>;
      },
      { user: number }[]
    >(data, debtorsSchema);

    yield put(usersSlice.actions.fill(normalizedDebtorsList.entities.user));

    yield put(
      getDebtorsSlice.actions.success({
        ...paginationParams,
        data: {
          entities: normalizedDebtorsList.entities.debtsInfo,
          keys: normalizedDebtorsList.result.map((item) => item.user),
        },
      })
    );
  } catch (error) {
    yield put(getDebtorsSlice.actions.error(error));
  }
}

function* getDebtorDebtsSaga(action: PayloadAction<GetDebtorDebtsPayload>) {
  const { debtorId, ...params } = action.payload;
  const lenderId = +(process.env.TELEGRAM_USER_ID || 0);

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
      getDebtorDebtsSlice.actions.success({
        ...paginationData,
        debtorId,
        data: debtIds,
      })
    );
  } catch (error) {
    yield put(
      getDebtorDebtsSlice.actions.error({
        debtorId,
        ...((error as { [key: string]: unknown }) || {}),
      })
    );
  }
}

export function* debtorsSagas() {
  yield takeEvery(getDebtorsSlice.actions.request, getDebtorsSaga);
  yield takeEvery(getDebtorDebtsSlice.actions.request, getDebtorDebtsSaga);
}
