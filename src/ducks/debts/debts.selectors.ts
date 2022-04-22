import { isProcessing } from '@common/store/helpers';
import { RootState } from '@store';

export const selectDebtById = (state: RootState, id: number) =>
  state.debts.debts.entities[id];

export const selectCreateDebtState = (state: RootState) =>
  state.debts.createDebt;

export const selectIsCreateDebtUploading = (state: RootState) =>
  isProcessing(selectCreateDebtState(state));
