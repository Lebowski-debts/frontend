import { apiClient } from '@api';
import { API_ROUTES, DEFAULT_DEBTORS_LIST_PARAMS } from '@common/constants/api';
import { ApiGetDebtorsParams } from '@common/types/api/debtor';

export const debtorsApi = {
  getDebtors: (userId: number, params: ApiGetDebtorsParams) =>
    apiClient.get(`${API_ROUTES.DEBT}/debtors/${userId}`, {
      params: { ...DEFAULT_DEBTORS_LIST_PARAMS, ...params },
    }),
};
