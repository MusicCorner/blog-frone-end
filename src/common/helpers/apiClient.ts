import { API_BASE_URL } from '@common/constants/api';
import { APIClient } from '@common/core/apiClient';

const apiClientDefaultHeaders = {
  'Content-Type': 'application/json',
};

export const authApiClient = new APIClient({
  defaultHeaders: {
    ...apiClientDefaultHeaders,
    get Authorization() {
      return `Bearer ${localStorage.getItem('accessToken') || ''}`;
    },
  },
  baseUrl: API_BASE_URL,
});

export const guestApiClient = new APIClient({
  baseUrl: API_BASE_URL,
  defaultHeaders: apiClientDefaultHeaders,
});
