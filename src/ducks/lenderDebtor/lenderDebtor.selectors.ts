import { RootState } from '@store';

export const selectGetLenderDebtorDebts = (
  state: RootState,
  lenderDebtorKey: string
) => state.lenderDebtor.getLenderDebtorDebts[lenderDebtorKey];
