import { apiClient } from '@api';
import { API_ROUTES, DEFAULT_DEBTORS_LIST_PARAMS } from '@common/constants/api';
import { PaginatedHttpSuccessResponse } from '@common/types/api';
import { ApiGetDebtorDebts } from '@common/types/api/debt';
import { ApiGetDebtor, ApiGetDebtorsParams } from '@common/types/api/debtor';

export const debtorsApi = {
  getDebtors: (userId: number, params: ApiGetDebtorsParams) =>
    apiClient.get<PaginatedHttpSuccessResponse<ApiGetDebtor[]>>(
      `${API_ROUTES.DEBT}/debtors/${userId}`,
      {
        params: { ...DEFAULT_DEBTORS_LIST_PARAMS, ...params },
      }
    ),

  getDebotrDebts: (fromId: number, toId: number, params: ApiGetDebtorsParams) =>
    apiClient.get<ApiGetDebtorDebts>(
      `${API_ROUTES.DEBT}/debts/from/${fromId}/to/${toId}`,
      {
        params,
      }
    ),
};
