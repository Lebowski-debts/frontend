import axios from 'axios';

let _apiClient;

export const initApiClient = () => {
  _apiClient = axios.create({
    baseURL: `${process.env.API_URL || ''}/telegram`,
    headers: { Authorization: process.env.API_TOKEN || '' },
  });

  // _apiClient.interceptors.response.use((response) => response.data);

  return _apiClient;
};

export const apiClient = _apiClient || initApiClient();
