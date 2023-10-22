import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/libs/redux/store.ts";
import http from "@/service/http/http.service.ts";
import { env } from "@/common/env/env.ts";
import { HttpError } from "@/service/http/http-error.ts";
import {
  CreateUrlRequest,
  GetUrlRequest,
  URL_REDUCER_NAME,
} from "@/libs/redux/url/common.ts";

export const createUrl = createAsyncThunk(
  `${URL_REDUCER_NAME}`,
  async (urlBody: CreateUrlRequest, { getState, rejectWithValue }) => {
    const state: RootState = getState() as RootState;

    try {
      return await http.post(`${env.api.url}`, urlBody, {
        authorization: `Bearer ${state.authentication.token ?? ""}`,
      });
    } catch (err) {
      const error = err as HttpError;
      return rejectWithValue(error.payload);
    }
  },
);

export const loadUrls = createAsyncThunk(
  `${URL_REDUCER_NAME}/all`,
  async (_, { getState, rejectWithValue }) => {
    const state: RootState = getState() as RootState;

    try {
      return await http.get(`${env.api.url}/all`, {
        authorization: `Bearer ${state.authentication.token ?? ""}`,
      });
    } catch (err) {
      const error = err as HttpError;
      return rejectWithValue(error.payload);
    }
  },
);

export const getUrl = createAsyncThunk(
  `${URL_REDUCER_NAME}/redirect`,
  async ({ hash }: GetUrlRequest, { getState, rejectWithValue }) => {
    const state: RootState = getState() as RootState;

    try {
      return await http.get(`${env.api.url}?hash=${hash}`, {
        authorization: `Bearer ${state.authentication.token ?? ""}`,
      });
    } catch (err) {
      const error = err as HttpError;
      return rejectWithValue(error.payload);
    }
  },
);

export const deactivateUrl = createAsyncThunk(
  `${URL_REDUCER_NAME}/deactivate`,
  async ({ hash }: GetUrlRequest, { getState, rejectWithValue }) => {
    const state: RootState = getState() as RootState;

    try {
      return await http.post(
        `${env.api.url}/deactivate`,
        {
          hash,
        },
        {
          authorization: `Bearer ${state.authentication.token ?? ""}`,
        },
      );
    } catch (err) {
      const error = err as HttpError;
      return rejectWithValue(error.payload);
    }
  },
);
