export const AUTHENTICATION_REDUCER_NAME = "authentication";

export type User = {
  email: string;
};

export type InitialState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  user: User | null;
  error: string | null;
};

export type SignUpBody = {
  email: string;
  password: string;
};

export type LoginBody = {
  email: string;
  password: string;
};

export type AuthenticationError = {
  message: string;
};
