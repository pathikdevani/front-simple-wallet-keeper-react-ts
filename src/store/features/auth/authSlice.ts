import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../..";
import { ensurePasswordAsync } from "./authThunk";

interface AuthState {
  auth: boolean;
  loading: boolean;
  password: string | null;
  error: string;
}

const initialState = {
  auth: false,
  loading: false,
  password: null,
  error: "",
} as AuthState;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      ensurePasswordAsync.fulfilled,
      (state, action: PayloadAction<{ valid: boolean }>) => {
        state.loading = false;
        if (action.payload.valid) {
          state.auth = action.payload.valid;
        } else {
          state.error = "Password is not valid, Please try again";
        }
      }
    );

    builder.addCase(ensurePasswordAsync.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(ensurePasswordAsync.rejected, (state) => {
      state.loading = false;
      state.error = "Internal error is not valid, Please try again";
    });
  },
});

export const authMiddleware = (store: any) => (next: any) => (action: any) => {
  return next(action);
};

export const selectAuthState = (state: AppState) => state.auth;

export default authSlice.reducer;
