import { ApiPayTheDebtOff } from '@common/types/api/debt';
import { ApiGetDebtorsParams } from '@common/types/api/debtor';

export interface PayTheDebtOffPayload {
  data: Omit<ApiPayTheDebtOff, 'isFullPayment'>;
  debtId: number;
}
export interface GetDebtorDebtsPayload extends ApiGetDebtorsParams {
  debtorId: number;
}
