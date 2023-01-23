export interface APILoginPayload {
  login: string;
  password: string;
}

export interface APISignUpPayload extends APILoginPayload {
  firstName: string;
  lastName: string;
  email: string;
}
