import { RootState } from '@store';

export const selectUser = (state: RootState, id: number) =>
  state.users.entities[id];
