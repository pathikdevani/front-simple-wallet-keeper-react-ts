import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./Login.css";
import { AppDispatch } from "./store";
import { selectAuthState } from "./store/features/auth/authSlice";

import { ensurePasswordAsync } from "./store/features/auth/authThunk";
import {
  selectWalletState,
} from "./store/features/wallet/walletSlice";
import { clearWalletAsync } from "./store/features/wallet/walletThunk";


function Login() {
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const walletState = useSelector(selectWalletState);
  const authState = useSelector(selectAuthState);

  function handleEnterApp() {
    dispatch(ensurePasswordAsync({ password }));
  }

  function handleClearApp() {
    dispatch(clearWalletAsync());
  }

  return (
    <div className="login" data-testid="login">
      <div className="app-help">
        {walletState.wallets.length
          ? ` App already has ${walletState.wallets.length} wallets stored, please enter valid password and enter
        the app.`
          : "App don't have any wallets. Please choose your password and enter the app"}
      </div>
      <div>
        <input
          className="password-input"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button onClick={handleEnterApp} className="enter-app-button">
          Enter App
        </button>
        <button onClick={handleClearApp} className="home-button">
          Clear App
        </button>

        <div className="login-error">{authState.error}</div>
      </div>
    </div>
  );
}

export default Login;
