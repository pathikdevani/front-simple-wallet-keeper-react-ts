import { ethers } from "ethers";
import { WalletBase } from "./wallet-base";

class EtherWallet implements WalletBase {
  private wallet: ethers.Wallet | undefined;
  private address: string = "";
  private encrypted: string | undefined;

  random() {
    this.wallet = ethers.Wallet.createRandom();
    this.address = this.wallet.address;
  }

  async encrypt(password: string) {
    if (this.isAlive() && !this.encrypted) {
      let options = {
        scrypt: {
          N: 1 << 1,
        },
      };
      this.encrypted = await this.wallet?.encrypt(password, options);
    }
  }
  getAddress(): string {
    return this.address;
  }
  getEncrypted(): string | undefined {
    if (this.encrypted) {
      return this.encrypted;
    }
  }

  isAlive(): boolean {
    return this.wallet !== null && this.wallet !== undefined;
  }
  getPrivateKey(): string | undefined {
    if (this.isAlive()) {
      return this.wallet?.privateKey;
    }
  }
  async decrypt(password: string, force?: boolean) {
    if ((force || !this.isAlive()) && this.encrypted) {
      this.wallet = await ethers.Wallet.fromEncryptedJson(
        this.encrypted,
        password
      );
    }
  }

  loadJson(address: string, json: string) {
    this.address = address;
    this.encrypted = json;
  }

  __test__make_dead(): void {
    this.wallet = undefined;
  }
}

export default EtherWallet;
