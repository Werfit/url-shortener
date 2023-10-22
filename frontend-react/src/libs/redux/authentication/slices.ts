"use client";
import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import storage from "@/service/storage/storage.service";
import { StorageKey } from "@/common/constants/storage.enum";
import type {
  AuthenticationError,
  InitialState,
  User,
} from "@/libs/redux/authentication/common";
import { AUTHENTICATION_REDUCER_NAME } from "@/libs/redux/authentication/common";
import {
  loginUser,
  signUpUser,
  verifyUser,
} from "@/libs/redux/authentication/thunk";
import jwtDecoder from "@/service/jwt/jwt.service";

const initialState: InitialState = {
  isAuthenticated: false,
  isLoading: false,
  token: storage.getItem(StorageKey.TOKEN),
  user: null,
  error: null,
};

const authenticationSlice = createSlice({
  name: AUTHENTICATION_REDUCER_NAME,
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.token = null;
      state.user = null;
      storage.deleteItem(StorageKey.TOKEN);
    },

    cleanUpError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(verifyUser.fulfilled, (state) => {
      // if request is fulfilled, token can not possibly be null (or error on the backend)
      const payload = jwtDecoder.decode<User>(state.token!);

      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = { email: payload.email };
    });

    builder.addCase(verifyUser.pending, (state) => {
      state.isAuthenticated = false;
      state.isLoading = true;
      state.user = null;
    });

    builder.addMatcher(
      isAnyOf(loginUser.pending, signUpUser.pending),
      (state) => {
        state.isAuthenticated = false;
        state.isLoading = true;
        state.token = null;
        state.user = null;
      },
    );

    builder.addMatcher(
      isAnyOf(loginUser.fulfilled, signUpUser.fulfilled),
      (state, action) => {
        const payload = jwtDecoder.decode<User>(action.payload.accessToken);

        state.isAuthenticated = true;
        state.isLoading = false;
        state.user = { email: payload.email };
        state.token = action.payload.accessToken;

        storage.setItem(StorageKey.TOKEN, action.payload.accessToken);
      },
    );

    builder.addMatcher(
      isAnyOf(loginUser.rejected, signUpUser.rejected, verifyUser.rejected),
      (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        storage.deleteItem(StorageKey.TOKEN);

        if (action.type !== verifyUser.rejected.type) {
          state.error = (action.payload as AuthenticationError).message;
        }
      },
    );
  },
});

export const { logout, cleanUpError } = authenticationSlice.actions;
export default authenticationSlice.reducer;
