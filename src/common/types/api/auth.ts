export interface APILoginPayload {
  login: string;
  password: string;
}

export interface APISignUpPayload extends APILoginPayload {
  firstName: string;
  lastName: string;
  email: string;
}

export interface APIAuthResponse {
  access_token: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  email: string;
}
