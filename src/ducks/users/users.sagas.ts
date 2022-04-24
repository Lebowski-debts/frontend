import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import { usersApi } from '@api/users';
import { ApiGetUser } from '@common/types/api/user';

import { getUserByIdSlice, usersSlice } from './users.slice';
import { GetUserByIdRequestPayload } from './users.types';

function* getUserByIdSaga({
  payload,
}: PayloadAction<GetUserByIdRequestPayload>) {
  const { userId } = payload;
  try {
    const { data } = (yield call(
      usersApi.getUserById,
      userId
    )) as AxiosResponse<{ user: ApiGetUser }>;

    yield put(usersSlice.actions.fill({ [userId]: data.user }));
    yield put(getUserByIdSlice.actions.success({ userId }));
  } catch (error) {
    yield put(getUserByIdSlice.actions.error({ userId, error }));
  }
}

export function* usersSagas() {
  yield takeLatest(getUserByIdSlice.actions.request, getUserByIdSaga);
}
