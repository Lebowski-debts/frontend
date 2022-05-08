import { ApiListParams } from '..';
import { ApiGetUser } from '../user';

export interface ApiGetDebtorDebtsCommonInfo {
  count: number;
  actualSum: number;
  firstDebtDate: string;
  lastDebtDate: string;
  initialSum: number;
  hasExpiredDebts: boolean;
}
export interface ApiGetDebtor {
  user: ApiGetUser;
  debtsInfo: ApiGetDebtorDebtsCommonInfo;
}

export type PaymentStatus = 'NEW' | 'PAID' | 'IN_PROGRESS';

export type ExpirationStatus = 'NOT_EXPIRED' | 'EXPIRED';

export type SortBy = 'createdAt' | 'expirationDate';

export interface ApiGetDebtorsParams extends ApiListParams {
  paymentStatusList?: PaymentStatus;
  expirationStatus?: ExpirationStatus;
}
