import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
} from '@reduxjs/toolkit';
import { Draft } from 'immer';

export interface AsyncState<SuccessPayload, ErrorPayload> {
  isProcessing?: boolean;
  isSuccess?: boolean;
  error?: ErrorPayload | null;
  value?: SuccessPayload | null;
  [key: string]: unknown;
}

export interface _AsyncState<SuccessPayload, ErrorPayload> {
  isProcessing: boolean;
  isSuccess: boolean;
  error: ErrorPayload | null;
  value: SuccessPayload | null;
  [key: string]: unknown;
}

export interface _CreateSliceOptions<State> {
  reducers?: ValidateSliceCaseReducers<State, SliceCaseReducers<State>>;
  initialState?: State;
  name: string;
}

export const initialAsyncState = {
  isProcessing: false,
  isSuccess: false,
  error: null,
  value: null,
};

export const createAsyncSlice = <
  RequestPayload,
  SuccessPayload = undefined,
  ErrorPayload = unknown
>(
  options: _CreateSliceOptions<AsyncState<SuccessPayload, ErrorPayload>>
) => {
  return {
    ...createSlice({
      ...options,
      initialState: {
        ...initialAsyncState,
        ...options.initialState,
      },
      name: `async/${options.name}`,
      reducers: {
        reset: (state) => {
          state.isProcessing = false;
          state.isSuccess = false;
          state.error = null;
          state.value = null;
        },
        request: (state, _action: PayloadAction<Draft<RequestPayload>>) => {
          state.isProcessing = true;
          state.isSuccess = false;
          state.error = null;
        },
        success: (state, action: PayloadAction<Draft<SuccessPayload>>) => {
          state.isProcessing = false;
          state.isSuccess = true;
          state.value = action.payload;
          state.error = null;
        },
        error: (state, action: PayloadAction<Draft<ErrorPayload>>) => {
          state.isProcessing = false;
          state.isSuccess = false;
          state.error = action.payload;
        },
        ...options.reducers,
      },
    }),
    // actionNames: {
    //   request: `async/${options.name}/request`,
    //   success: `async/${options.name}/success`,
    //   error: `async/${options.name}/error`,
    // },
  };
};

export const isProcessing = (asyncState: _AsyncState<unknown, unknown>) =>
  asyncState.isProcessing;

export const isSuccess = (asyncState: _AsyncState<unknown, unknown>) =>
  !asyncState.isProcessing && asyncState.isSuccess;

export const isError = (asyncState: _AsyncState<unknown, unknown>) =>
  !asyncState.isProcessing && !!asyncState.error;

export const pure = <T>(state: T) => state;
