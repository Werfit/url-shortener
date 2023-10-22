import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./authentication/slices";
import urlReducer from "./url/slices";

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    url: urlReducer,
  },
  devTools: process.env.NODE_ENV === "development",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
