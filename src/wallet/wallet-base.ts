export class WalletBase {
  async encrypt(password: string) {
    throw new Error("Method not implemented.");
  }
  random() {
    throw new Error("Method not implemented.");
  }
  decrypt(password: string, force?: boolean) {
    throw new Error("Method not implemented.");
  }
  isAlive(): boolean {
    throw new Error("Method not implemented.");
  }
  getPrivateKey(): string | undefined {
    throw new Error("Method not implemented.");
  }
  getAddress(): string {
    throw new Error("Method not implemented.");
  }
  getEncrypted(): string | undefined {
    throw new Error("Method not implemented.");
  }

  loadJson(address: string, json: string) {
    throw new Error("Method not implemented.");
  }

  __test__make_dead(){
    throw new Error("Method not implemented.");
  }
}
