import store from "store2";
import { IStorage } from "./type";

class LocalStorage implements IStorage {
  set(key: string, data: object): void {
    store.set(key, data);
  }
  get(key: string): object {
    return store.get(key);
  }
}

export default LocalStorage;