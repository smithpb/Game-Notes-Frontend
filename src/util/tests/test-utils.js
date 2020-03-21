import React from "react";
import { render } from "@testing-library/react";
import { AppContext } from "../../contexts/context";
import { combinedState } from "../../hooks/combine-reducers";

function customRender(ui, { state = combinedState, ...options } = {}) {
  const updated = { ...combinedState, ...state };
  const store = { state: updated };
  function Wrapper(props) {
    return <AppContext.Provider value={store} {...props} />;
  }

  return render(ui, { wrapper: Wrapper, ...options });
}

export * from "@testing-library/react";

export { customRender as render };
