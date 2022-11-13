import { IStorage } from "../wallet-storage/type";
import { WalletBase } from "./wallet-base";

class WalletManager {
  private wallets: Array<WalletBase> = [];
  private Wallet: typeof WalletBase;
  private password?: string;
  private storage: IStorage;

  constructor(Wallet: typeof WalletBase, storage: IStorage) {
    this.Wallet = Wallet;
    this.storage = storage;
  }

  async create() {
    const wallet = new this.Wallet();
    wallet.random();
    this.wallets.push(wallet);
    await this.encrypt(this.wallets.length - 1);
  }

  async remove(index: number) {
    this.wallets = this.wallets.filter((_, i) => {
      return i !== index;
    });
    await this.store();
  }

  async decrypt(index: number) {
    const wallet = this.wallets[index];
    if (!wallet.isAlive() && this.password) {
      await wallet.decrypt(this.password);
    }
  }

  async encrypt(index: number) {
    const wallet = this.wallets[index];
    if (wallet.isAlive() && this.password) {
      await wallet.encrypt(this.password);
    }
    await this.store();
  }

  async getPrivateKey(index: number) {
    const wallet = this.wallets[index];
    if (!wallet.isAlive() && this.password) {
      await wallet.decrypt(this.password);
    }
    return wallet.getPrivateKey();
  }

  private async store() {
    const data = this.wallets.map((wallet) => {
      return {
        address: wallet.getAddress(),
        encrypted: wallet.getEncrypted(),
      };
    });
    await this.storage.set("wallet", data);
  }

  loadFromStorage() {
    const data: { address: string; encrypted: string }[] = this.storage.get(
      "wallet"
    ) as { address: string; encrypted: string }[];

    if (data) {
      data.forEach((e) => {
        const wallet = new this.Wallet();
        wallet.loadJson(e.address, e.encrypted);
        this.wallets.push(wallet);
      });
    }

    return data || [];
  }

  updatePassword(password: string) {
    this.password = password;
  }

  isSamePassword(password: string) {
    return this.password === password;
  }

  async ensurePassword(password: string): Promise<boolean> {
    if (this.wallets.length > 0) {
      const wallet = this.wallets[0];
      try {
        await wallet.decrypt(password, true);
        return true;
      } catch (error) {
        return false;
      }
    }
    return true;
  }

  getData(): { address: string; encrypted: string }[] {
    return this.wallets.map((wallet) => {
      return {
        address: wallet.getAddress() || "",
        encrypted: wallet.getEncrypted() || "",
      };
    });
  }

  async clear() {
    this.wallets = [];
    this.storage.set('wallet', [])
  }

  __test__make_dead(index: number) {
    const wallet = this.wallets[index];
    if(wallet) {
      wallet.__test__make_dead();
    }
  }
}

export default WalletManager;
