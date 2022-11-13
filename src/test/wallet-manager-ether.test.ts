import store from "store2";
import LocalStorage from "../wallet-storage/local-storage";
import EtherWallet from "../wallet/ether-wallet";
import WalletManager from "../wallet/wallet-manager";

const manager = new WalletManager(EtherWallet, new LocalStorage());
manager.loadFromStorage();
export default manager;

const DEFAULT_PASS = "pass";
const WRONG_PASS = "wrong-pass";
const EMPTY_PASS = "wrong-pass";

beforeEach(async () => {
  await manager.clear();
  await manager.updatePassword(DEFAULT_PASS);
});

it("clear: should work", async () => {
  await manager.create();
  expect(manager.getData().length).toBe(1);

  await manager.clear();
  expect(manager.getData().length).toBe(0);
});

it("create: should create account", async () => {
  expect(manager.getData().length).toBe(0);
  await manager.create();
  expect(manager.getData().length).toBe(1);
});

it("create: should create with address/encrypted", async () => {
  await manager.create();
  const walletData = await manager.getData();
  expect(walletData[0].address).toBeDefined();
  expect(walletData[0].encrypted).toBeDefined();
});

it("remove: should work", async () => {
  await manager.create();
  await manager.create();
  const dataOld = await manager.getData();
  expect(manager.getData().length).toBe(2);
  await manager.remove(1);
  const dataNew = await manager.getData();
  expect(manager.getData().length).toBe(1);

  expect(dataOld[0].address).toBe(dataNew[0].address);
});

it("encrypt: should work", async () => {
  await manager.updatePassword(EMPTY_PASS);
  await manager.create();
  const dataOld = await manager.getData();
  expect(dataOld[0].encrypted).toBeTruthy();

  await manager.updatePassword(DEFAULT_PASS);
  await manager.encrypt(0);
  const data = await manager.getData();
  expect(data[0].encrypted).toBeTruthy();
});

it("decrypt: should work", async () => {
  await manager.create();
  const data = await manager.getData();
  expect(data[0].encrypted).toBeTruthy();

  // make wallet dead to remove alive instance of wallet
  await manager.__test__make_dead(0);
  await manager.decrypt(0);
  const key = await manager.getPrivateKey(0);
  expect(key).toBeDefined();
});

it("loadFromStorage: should work after flush", async () => {
  await manager.create();

  const dataOld = await manager.getData();
  expect(dataOld.length).toBe(1);
  await manager.clear();
  expect(manager.getData().length).toBe(0);

  store.set("wallet", dataOld);
  await manager.loadFromStorage();

  const dataNew = await manager.getData();
  expect(dataNew.length).toBe(1);

  expect(dataNew).toStrictEqual(dataOld);
});

it("updatePassword | isSamePassword: should work", async () => {
  expect(manager.isSamePassword(DEFAULT_PASS)).toStrictEqual(true);
  manager.updatePassword(WRONG_PASS);
  expect(manager.isSamePassword(WRONG_PASS)).toStrictEqual(true);
});

it("ensurePassword: should work", async () => {
  await manager.create();
  const isValid = await manager.ensurePassword(WRONG_PASS);
  expect(isValid).toBe(false);
});
