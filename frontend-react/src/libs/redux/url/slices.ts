"use client";
import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  InitialState,
  URL_REDUCER_NAME,
  UrlError,
} from "@/libs/redux/url/common.ts";
import { createUrl, deactivateUrl, loadUrls } from "@/libs/redux/url/thunk.ts";

const initialState: InitialState = {
  urls: [],
  isLoading: false,
  error: null,
};

const urlSlice = createSlice({
  name: URL_REDUCER_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadUrls.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.urls = [];
    });

    builder.addCase(loadUrls.fulfilled, (state, action) => {
      state.isLoading = false;
      state.urls = action.payload.urls;
    });

    builder.addCase(createUrl.fulfilled, (state, action) => {
      state.urls = [action.payload, ...state.urls];
    });

    builder.addCase(deactivateUrl.fulfilled, (state, action) => {
      state.urls = state.urls.filter((url) => url.hash !== action.payload.hash);
    });

    builder.addMatcher(isAnyOf(loadUrls.rejected), (state, action) => {
      state.isLoading = false;
      state.urls = [];
      state.error = (action.payload as UrlError).message;
    });
  },
});

export default urlSlice.reducer;
