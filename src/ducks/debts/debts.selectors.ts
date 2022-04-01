import { RootState } from '@store';

export const selectDebtById = (state: RootState, id: number) =>
  state.debts.entities[id];
