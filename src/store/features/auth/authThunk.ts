import { createAsyncThunk } from "@reduxjs/toolkit";
import manager from "../../wallet-manager-ether";

export const ensurePasswordAsync = createAsyncThunk(
  "auth/ensurePasswordAsync",
  async ({ password }: { password: string }) => {
    const valid = await manager.ensurePassword(password);
    if(valid) {
        manager.updatePassword(password);
    }
    return {valid};
  }
);
