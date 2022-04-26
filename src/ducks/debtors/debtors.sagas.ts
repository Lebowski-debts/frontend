import { AxiosResponse } from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery } from 'redux-saga/effects';
import { normalize } from 'normalizr';

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

import { GetDebtorsPayload } from './debtors.types';
import { getDebtorsSlice } from './debtors.slice';
import { debtorsSchema } from './debtors.schemas';

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

export function* debtorsSagas() {
  yield takeEvery(getDebtorsSlice.actions.request, getDebtorsSaga);
}
