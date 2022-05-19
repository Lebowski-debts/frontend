import { ApiPayTheDebtOff } from '@common/types/api/debt';

export interface PayTheDebtOffPayload {
  data: Omit<ApiPayTheDebtOff, 'isFullPayment'>;
  debtId: number;
}
