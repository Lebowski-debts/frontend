import { combineReducers } from 'redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ApiGetUser } from '@common/types/api/user';
import { NormalizedListValues } from '@common/types/api';
import { _AsyncState } from '@common/store/helpers';

import {
  GetUserByIdErrorPayload,
  GetUserByIdRequestPayload,
} from './users.types';

const initialState: { entities: NormalizedListValues<ApiGetUser> } = {
  entities: {},
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fill: (state, action: PayloadAction<NormalizedListValues<ApiGetUser>>) => {
      state.entities = { ...state.entities, ...action.payload };
    },
  },
});

export interface GetUserByIdState {
  [key: number]: _AsyncState<unknown, unknown>;
}

const getUserByIdState: GetUserByIdState = {};

export const getUserByIdSlice = createSlice({
  name: 'getUser',
  initialState: getUserByIdState,
  reducers: {
    request: (state, { payload }: PayloadAction<GetUserByIdRequestPayload>) => {
      state[payload.userId] = {
        ...state[payload.userId],
        isProcessing: true,
        isSuccess: false,
        error: null,
      };
    },
    success: (state, { payload }: PayloadAction<GetUserByIdRequestPayload>) => {
      state[payload.userId] = {
        ...state[payload.userId],
        isProcessing: false,
        isSuccess: true,
        error: null,
      };
    },
    error: (state, { payload }: PayloadAction<GetUserByIdErrorPayload>) => {
      state[payload.userId] = {
        ...state[payload.userId],
        isProcessing: false,
        isSuccess: false,
        error: payload.error,
      };
    },
  },
});

export const usersReducer = combineReducers({
  users: usersSlice.reducer,
  getUserById: getUserByIdSlice.reducer,
});
