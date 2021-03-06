import { apiClient } from '@api';
import {
  API_ROUTES,
  DEFAULT_DEBTORS_LIST_PARAMS,
  DEFAULT_DEBTS_LIST_PARAMS,
} from '@common/constants/api';
import { PaginatedHttpSuccessResponse } from '@common/types/api';
import {
  ApiCreateDebt,
  ApiGetDebtorDebts,
  ApiPayTheDebtOff,
} from '@common/types/api/debt';
import { ApiGetDebtor, ApiGetDebtorsParams } from '@common/types/api/debtor';

export const debtorsApi = {
  getDebtors: (userId: number, params: ApiGetDebtorsParams) =>
    apiClient.get<PaginatedHttpSuccessResponse<ApiGetDebtor[]>>(
      `${API_ROUTES.DEBT}/debtors/${userId}`,
      {
        params: { ...DEFAULT_DEBTORS_LIST_PARAMS, ...params },
      }
    ),

  getLenders: (userId: number, params: ApiGetDebtorsParams) =>
    apiClient.get<PaginatedHttpSuccessResponse<ApiGetDebtor[]>>(
      `${API_ROUTES.DEBT}/lenders/${userId}`,
      {
        params: { ...DEFAULT_DEBTORS_LIST_PARAMS, ...params },
      }
    ),

  getDebtorDebts: (
    fromId: number,
    toId: number,
    params: ApiGetDebtorsParams
  ) => {
    return apiClient.get<ApiGetDebtorDebts>(
      `${API_ROUTES.DEBT}/debts/from/${fromId}/to/${toId}`,
      {
        params: { ...DEFAULT_DEBTS_LIST_PARAMS, ...params },
      }
    );
  },

  createDebtorDebt: (data: ApiCreateDebt) =>
    apiClient.post(API_ROUTES.DEBT, data),

  payTheDebtOff: (debtId: number, data: ApiPayTheDebtOff) =>
    apiClient.post(`${API_ROUTES.DEBT}/pay/${debtId}`, data),
};
