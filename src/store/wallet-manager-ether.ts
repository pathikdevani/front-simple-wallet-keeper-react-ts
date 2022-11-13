import LocalStorage from "../wallet-storage/local-storage";
import EtherWallet from "../wallet/ether-wallet";
import WalletManager from "../wallet/wallet-manager";

const manager = new WalletManager(EtherWallet, new LocalStorage());
manager.loadFromStorage();
export default manager;
