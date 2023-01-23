import { guestApiClient } from '@common/helpers/apiClient';
import { APILoginPayload, APISignUpPayload } from '@common/types/api/auth';

export const authApi = {
  signUp: (body: APISignUpPayload) =>
    guestApiClient.post('auth/signup', { body }),

  login: (body: APILoginPayload) => guestApiClient.post('auth/login', { body }),
};
