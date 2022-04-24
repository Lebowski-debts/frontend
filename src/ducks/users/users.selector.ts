import { isProcessing } from '@common/store/helpers';
import { RootState } from '@store';

export const selectUser = (state: RootState, id: number) =>
  state.users.users.entities[id];

export const selectGetUserState = (state: RootState, userId: number) =>
  state.users.getUserById[userId];

export const selectIsGetUserLoading = (state: RootState, userId: number) =>
  selectGetUserState(state, userId)
    ? isProcessing(selectGetUserState(state, userId))
    : false;
