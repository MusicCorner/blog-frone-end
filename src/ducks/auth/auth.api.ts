import { API_ENPOINTS } from '@common/constants/api';
import { guestApiClient } from '@common/helpers/apiClient';
import {
  APIAuthResponse,
  APILoginPayload,
  APISignUpPayload,
} from '@common/types/api/auth';

export const authApi = {
  signUp: (body: APISignUpPayload) =>
    guestApiClient.post<APIAuthResponse>(API_ENPOINTS.SIGN_UP, {
      body,
    }),

  login: (body: APILoginPayload) =>
    guestApiClient.post<APIAuthResponse>(API_ENPOINTS.SIGN_IN, {
      body,
    }),
};
