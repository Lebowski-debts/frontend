import { PaginatedHttpSuccessResponse } from '..';
import { PaymentStatus } from '../debtor';
import { ApiGetUser } from '../user';

export interface ApiGetDebt {
  initialSum: number;
  actualSum: number;
  expireDate: string;
  createdAt: string;
  id: number;
  paymentStatus: PaymentStatus;
  isPaid: boolean;
  isExpired: boolean;
}

export interface ApiGetDebtorDebts
  extends PaginatedHttpSuccessResponse<ApiGetDebt[]> {
  lenderUser: ApiGetUser;
  debtorUser: ApiGetUser;
}

export interface ApiCreateDebt {
  debtorId: number;
  lenderId: number;
  sum: number;
  expireDate: string;
  comment?: string;
}

export interface ApiPayTheDebtOff {
  isFullPayment?: boolean;
  paidSum: number;
}
