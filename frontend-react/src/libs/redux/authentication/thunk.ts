import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "@/service/http/http.service";

import {
  AUTHENTICATION_REDUCER_NAME,
  LoginBody,
  SignUpBody,
} from "@/libs/redux/authentication/common";
import { env } from "@/common/env/env";
import { HttpError } from "@/service/http/http-error";
import { RootState } from "@/libs/redux/store";

export const signUpUser = createAsyncThunk(
  `${AUTHENTICATION_REDUCER_NAME}/sign-up`,
  async (userData: SignUpBody, { rejectWithValue }) => {
    try {
      // signing user up
      await http.post(`${env.api.authorization}/sign-up`, userData);

      // sign up endpoint only creates user in the database, so we need to log him in
      return await http.post(`${env.api.authorization}/login`, userData);
    } catch (err) {
      const error = err as HttpError;
      return rejectWithValue(error.payload);
    }
  },
);

export const loginUser = createAsyncThunk(
  `${AUTHENTICATION_REDUCER_NAME}/login`,
  async (userData: LoginBody, { rejectWithValue }) => {
    try {
      return await http.post(`${env.api.authorization}/login`, userData);
    } catch (err) {
      console.log(err);
      const error = err as HttpError;
      return rejectWithValue(error.payload);
    }
  },
);

export const verifyUser = createAsyncThunk(
  `${AUTHENTICATION_REDUCER_NAME}/verify`,
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;

    try {
      return await http.get(`${env.api.authorization}/verify`, {
        authorization: `Bearer ${state.authentication.token ?? ""}`,
      });
    } catch (err) {
      const error = err as HttpError;
      return rejectWithValue(error.payload);
    }
  },
);
