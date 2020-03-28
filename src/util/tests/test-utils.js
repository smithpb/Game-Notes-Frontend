import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppContext } from "../../contexts/context";
import { combinedState } from "../../hooks/combine-reducers";

function customRender(
  ui,
  { state = combinedState, dispatch, ...options } = {}
) {
  const updated = { ...combinedState, ...state };
  const store = { state: updated, dispatch };
  function Wrapper(props) {
    return (
      <Router>
        <AppContext.Provider value={store} {...props} />;
      </Router>
    );
  }

  return render(ui, { wrapper: Wrapper, ...options });
}

export * from "@testing-library/react";

export { customRender as render };
