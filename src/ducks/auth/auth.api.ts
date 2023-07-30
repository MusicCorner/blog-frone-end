import { guestApiClient } from '@common/helpers/apiClient';
import {
  APIAuthResponse,
  APILoginPayload,
  APISignUpPayload,
} from '@common/types/api/auth';

export const authApi = {
  signUp: (body: APISignUpPayload) =>
    guestApiClient.post<APISignUpPayload, APIAuthResponse>('auth/signup', {
      body,
    }),

  login: (body: APILoginPayload) =>
    guestApiClient.post<APILoginPayload, APIAuthResponse>('auth/signin', {
      body,
    }),
};
