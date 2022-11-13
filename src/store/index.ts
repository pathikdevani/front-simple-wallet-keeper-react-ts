import { configureStore } from "@reduxjs/toolkit";

import { authSlice } from "./features/auth/authSlice";
import { walletSlice } from "./features/wallet/walletSlice";

export const storeFn = () => {
  return configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
      [walletSlice.name]: walletSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true,
  });
};
export const store = storeFn();

export type AppStore = typeof store;
export type AppState = ReturnType<AppStore["getState"]>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
