import { apiClient } from '@api';
import { API_ROUTES } from '@common/constants/api';

export const usersApi = {
  getUserById: (id: number) => apiClient.get(`${API_ROUTES.USER}/${id}`),
};
