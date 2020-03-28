import React from "react";
import { render, fireEvent, cleanup } from "../../util/tests/test-utils";
import "@testing-library/jest-dom/extend-expect";
import Login from "./Login";
import moxios from "moxios";

const initialState = {
  appState: {
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
const setup = (testState = {}) => {
  const store = {
    state: { appState: { ...initialState.appState, ...testState } },
    dispatch: mockDispatch
  };
  return render(<Login />, store);
};

afterEach(cleanup);

describe("<Login />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });

  test("should render without error", () => {
    const component = wrapper.getByTestId("login-component");
    expect(component).toBeTruthy();
  });

  test("should contain an input for username", () => {
    const userInput = wrapper.getByLabelText(/username/i);
    expect(userInput).toBeTruthy();
  });
  test("should contain an input for password", () => {
    const passwordInput = wrapper.getByLabelText(/password/i);
    expect(passwordInput).toBeTruthy();
  });
  test("should contain a submit button", () => {
    const submitBtn = wrapper.getByText(/submit/i);
    expect(submitBtn).toBeTruthy();
  });
});

describe("input fields", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  test("that username state updates to match input value", () => {
    const userInput = wrapper.getByLabelText(/username/i);
    fireEvent.change(userInput, { target: { value: "John" } });
    expect(userInput.value).toMatch(/john/i);
  });
  test("that password state updates to match input value", () => {
    const passwordInput = wrapper.getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: "12345" } });
    expect(passwordInput.value).toMatch(/12345/i);
  });
});

describe("Component States", () => {
  // Error State
  test("error message should display when error state is set to true", () => {
    const { getByText } = setup({ error: "Something went wrong" });
    const errorMsg = getByText(/something went wrong/i);

    expect(errorMsg).toBeTruthy();
  });

  // Loading State
  test('Submit button should be disabled and read "Loading..." when loading state is true', () => {
    const { getByText } = setup({ isLoading: true });
    const loginBtn = getByText(/loading.../i);

    expect(loginBtn).toBeDisabled();
    expect(loginBtn).toHaveTextContent("Loading...");
  });
});

describe.skip("HTTP requests", () => {
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
