import { ApiGetDebtorsParams } from '@common/types/api/debtor';

export interface LenderDebtorActionProps {
  lenderId: number;
  debtorId: number;
}

export type GetLenderDebtorDebtsPayload = ApiGetDebtorsParams &
  LenderDebtorActionProps;
