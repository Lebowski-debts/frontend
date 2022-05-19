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
import { GetDebtorsPayload } from '@ducks/debtors/debtors.types';
import { debtorsSchema } from '@ducks/debtors/debtors.schemas';

import { getLendersSlice } from './lenders.slice';

function* getLendersSaga({ payload }: PayloadAction<GetDebtorsPayload>) {
  try {
    const { userId, ...params } = payload;
    const {
      data: { data, ...paginationParams },
    } = (yield call(debtorsApi.getLenders, userId, params)) as AxiosResponse<
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
      getLendersSlice.actions.success({
        ...paginationParams,
        data: {
          entities: normalizedDebtorsList.entities.debtsInfo,
          keys: normalizedDebtorsList.result.map((item) => item.user),
        },
      })
    );
  } catch (error) {
    yield put(getLendersSlice.actions.error(error));
  }
}

export function* lendersSagas() {
  yield takeEvery(getLendersSlice.actions.request, getLendersSaga);
}
