import { storeFn } from "../store";
import { ensurePasswordAsync } from "../store/features/auth/authThunk";
import { addWalletAsync } from "../store/features/wallet/walletThunk";

function utils({ subscribe }: { subscribe: () => void }) {
  let store = storeFn();
  const unsubscribe = store.subscribe(subscribe);
  return {
    store,
    unsubscribe,
  };
}

it("ensurePasswordAsync: auth should change to true after dispatch action", (done) => {
  const { store, unsubscribe } = utils({
    subscribe: () => {
      const state = store.getState();
      if (state.auth.auth) {
        unsubscribe();
        done();
      }
    },
  });
  store.dispatch(ensurePasswordAsync({ password: "test" }));
});

it("addWalletAsync: 1 wallet should be there after dispatch action", (done) => {
  const { store, unsubscribe } = utils({
    subscribe: () => {
      const state = store.getState();
      if (state.wallet.wallets.length === 1) {
        unsubscribe();
        done();
      }
    },
  });
  store.dispatch(ensurePasswordAsync({ password: "test" }));
  store.dispatch(addWalletAsync());
});

// ... NOTE: We can write test for any combination or
// actions and test the redux store check if actions have proper data reaction.
