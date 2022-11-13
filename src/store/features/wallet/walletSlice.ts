import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { addWalletAsync, clearWalletAsync, removeWalletAsync } from "./walletThunk";
import type { AppState } from "../..";
import manager from "../../wallet-manager-ether";

export const NAME = "wallet";

export interface WalletData {
  address: string;
  encrypted: string;
}

interface WalletState {
  wallets: Array<WalletData>;
}

const initialState = {
  wallets: manager.getData(),
} as WalletState;

export const walletSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    removeWallet: (state, action: PayloadAction<number>) => {
      state.wallets = state.wallets.filter((_, index) => {
        return index !== action.payload;
      });
    },
  },

  extraReducers(builder) {
    builder.addCase(addWalletAsync.fulfilled, (state) => {
      state.wallets = manager.getData();
    });
    builder.addCase(clearWalletAsync.fulfilled, (state) => {
      state.wallets = manager.getData();
    });
    builder.addCase(removeWalletAsync.fulfilled, (state) => {
      state.wallets = manager.getData();
    });
  },
});

export const { removeWallet } =
  walletSlice.actions;

export const selectWalletState = (state: AppState) => state.wallet;

export default walletSlice.reducer;
