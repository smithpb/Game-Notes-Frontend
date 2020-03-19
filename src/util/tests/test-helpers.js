import React from "react";
import { mount, shallow } from "enzyme";
import { initialState as login } from "../../reducer/login-reducer";
import { intialState as user } from "../../reducer/user-reducer";

const initialState = {
  login,
  user
};

/**
 * Function to setup the Login component for testing.
 * @param {object} state - State information that will be specific to each test
 * @returns {ReactWrapper}
 */
export const setup = (Component, state = {}, dispatch = jest.fn()) => {
  // Resets the jest.fn() to prevent overlaps between tests
  dispatch.mockClear();
  const newState = { ...initialState, ...state };

  // Replace the React hook with mock test versions
  const mockUseContext = jest.fn().mockReturnValue({ newState, dispatch });
  React.useContext = mockUseContext;

  return shallow(Component);
};
