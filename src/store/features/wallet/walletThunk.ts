import { createAsyncThunk } from "@reduxjs/toolkit";
import manager from "../../wallet-manager-ether";

export const addWalletAsync = createAsyncThunk("wallet/addAsync", async () => {
  await manager.create();
});

export const clearWalletAsync = createAsyncThunk(
  "wallet/clearAsync",
  async () => {
    await manager.clear();
  }
);

export const removeWalletAsync = createAsyncThunk(
  "wallet/removeAsync",
  async ({ index }: { index: number }) => {
    await manager.remove(index);
  }
);
