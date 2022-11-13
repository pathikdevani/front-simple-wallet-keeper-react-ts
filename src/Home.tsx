import { useSelector, useDispatch } from "react-redux";
import "./Home.css";
import {
  selectWalletState,
  WalletData,
} from "./store/features/wallet/walletSlice";
import { AppDispatch } from "./store";
import {
  addWalletAsync,
  clearWalletAsync,
  removeWalletAsync,
} from "./store/features/wallet/walletThunk";
import { useState } from "react";
import manager from "./store/wallet-manager-ether";
import getWalletBalance from "./utils/getWalletBalance";

function WalletItem(props: { index: number; walletItem: WalletData }) {
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [privateKey, setPrivateKey] = useState<string | undefined>("");
  const [balance, setBalance] = useState<string | undefined>("");
  const dispatch = useDispatch<AppDispatch>();

  const handleShowPrivateKey = async () => {
    if (manager.isSamePassword(password)) {
      await manager.decrypt(props.index);
      const key = await manager.getPrivateKey(props.index);
      setPrivateKey(key);
    } else {
      setError("please enter valid password");
    }
  };

  const handleRemoveWallet = async () => {
    dispatch(removeWalletAsync({ index: props.index }));
  };

  const handleShowBalance = async () => {
    const balance = await getWalletBalance(props.walletItem.address);
    setBalance(balance);
  };

  return (
    <div key={props.walletItem.address} className="wallet-item">
      <div>
        <b>Address:</b> {props.walletItem.address}
      </div>
      {privateKey && (
        <div>
          <b>PrivateKey:</b> {privateKey}
        </div>
      )}
      {balance && (
        <div>
          <b>Balance:</b> {balance}
        </div>
      )}
      <input
        value={password}
        onChange={(e) => {
          setError("");
          setPassword(e.target.value);
        }}
        type="password"
      ></input>
      <button onClick={handleShowPrivateKey}>Show PrivateKey</button>
      <button onClick={handleShowBalance}>Show balance</button>
      <button onClick={handleRemoveWallet}>Delete</button>
      {error && <div>{error}</div>}
    </div>
  );
}

function Home() {
  const walletState = useSelector(selectWalletState);
  const dispatch = useDispatch<AppDispatch>();

  function handleCreateWallet() {
    dispatch(addWalletAsync());
  }

  function handleClearApp() {
    dispatch(clearWalletAsync());
  }

  return (
    <div className="home" data-testid="home">
      <div className="app-help">
        {`App has ${walletState.wallets.length} wallets stored.`}
      </div>
      <div>
        <button className="home-button" onClick={handleClearApp}>
          Cleat All
        </button>
        <button className="home-button" onClick={handleCreateWallet}>
          + Create Wallet
        </button>
      </div>
      <div className="wallet-list">
        {walletState.wallets.map((wallet, index) => {
          return (
            <WalletItem
              key={wallet.address}
              index={index}
              walletItem={wallet}
            ></WalletItem>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
