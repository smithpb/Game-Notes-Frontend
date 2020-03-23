import React from "react";
import { mount, shallow } from "enzyme";
import { LOGIN_INPUT } from "../../reducer/dispatch-types";
import Login from "./Login";
import moxios from "moxios";

const initialState = {
  login: {
    username: "",
    password: "",
    isLoading: false,
    error: ""
  }
};

// This should be called in place of the reducer's dispatch function
const mockDispatch = jest.fn();

/**
 * Function to setup the Login component for testing.
 * @param {object} state - State information that will be specific to each test
 * @returns {ReactWrapper}
 */
const setup = (state = {}) => {
  // Resets the jest.fn() to prevent overlaps between tests
  mockDispatch.mockClear();
  const newState = { ...initialState, ...state };

  // Replace the React hook with mock test versions
  const mockUseContext = jest
    .fn()
    .mockReturnValue({ state: newState, dispatch: mockDispatch });
  React.useContext = mockUseContext;

  return mount(<Login />);
};

describe("<Login />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });
  test("should render without error", () => {
    const component = wrapper.find(".login-component");
    expect(component.length).toBe(1);
  });

  test("should contain an input for username", () => {
    const userInput = wrapper.find('input[name="username"]');
    expect(userInput.length).toBe(1);
  });
  test("should contain an input for password", () => {
    const passwordInput = wrapper.find('input[name="password"]');
    expect(passwordInput.length).toBe(1);
  });
  test("should contain a submit button", () => {
    const submitBtn = wrapper.find("#login-submit");
    expect(submitBtn.length).toBe(1);
  });
});

describe.skip("input fields", () => {
  let mockSetState = jest.fn();
  let wrapper;

  beforeEach(() => {
    mockSetState.mockClear();
    wrapper = setup();
  });

  test("that username state updates to match input value", () => {
    const usernameInput = wrapper.find('input[name="username"]');
    const mockEvent = { target: { value: "testuser" } };
    usernameInput.simulate("change", mockEvent);

    expect(usernameInput.props().value).toBe("testuser");
  });
  test("that password state updates to match input value", () => {
    const passwordInput = wrapper.find('input[name="password"]');
    const mockEvent = { target: { value: "test123" } };
    passwordInput.simulate("change", mockEvent);

    const testDispatch = {
      type: LOGIN_INPUT,
      payload: "test123",
      field: "password"
    };
    expect(mockDispatch).toHaveBeenCalledWith(testDispatch);
  });
});

describe("Component States", () => {
  let wrapper;

  // Error State
  test("error message should display when error state is set to true", () => {
    wrapper = setup({ login: { error: "Something went wrong" } });
    const errorMsg = wrapper.find(".error-message");

    expect(errorMsg.text()).toBe("Something went wrong");
  });

  // Loading State
  test('Submit button should be disabled and read "Loading..." when loading state is true', () => {
    wrapper = setup({ login: { isLoading: true } });
    const loginBtn = wrapper.find("#login-submit");

    expect(loginBtn.props().disabled).toBe(true);
    expect(loginBtn.text()).toBe("Loading...");
  });
});

describe("HTTP requests", () => {
  let wrapper;
  beforeEach(() => {
    moxios.install();
    wrapper = setup();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test("dispatch called to intialize loading", () => {
    mockDispatch.mockClear();
    const form = wrapper.find(".login-form");
    form.simulate("submit");

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: {}
      });
    });

    expect(mockDispatch).toHaveBeenCalled();
  });
});
