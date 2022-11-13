import React, { PropsWithChildren } from "react";

import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { storeFn } from "../store";
import App from "../App";
import { ensurePasswordAsync } from "../store/features/auth/authThunk";

function utils() {
  let store = storeFn();
  const renderWithProviders = (ui: React.ReactElement) => {
    function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
      return <Provider store={store}>{children}</Provider>;
    }
    return { store, ...render(ui, { wrapper: Wrapper }) };
  };

  return { store, renderWithProviders };
}

it("render App without auth, Login page should get rendered", async () => {
  const { renderWithProviders } = utils();
  renderWithProviders(<App />);
  const login = await screen.findAllByTestId("login");
  expect(login).toBeTruthy();
});

it("render App with auth, Home page should get rendered", async () => {
  const { renderWithProviders, store } = utils();
  renderWithProviders(<App />);
  await waitFor(async () => {
    store.dispatch(ensurePasswordAsync({ password: "123" }));
    const home = await screen.findAllByTestId("home");
    expect(home).toBeTruthy();
  });
});

// NOTE: this way we can write test for our
// component with as many as test scenarios
