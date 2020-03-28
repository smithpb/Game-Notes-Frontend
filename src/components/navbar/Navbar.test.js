import React from "react";
import { render, cleanup, fireEvent } from "../../util/tests/test-utils";
import Navbar from "./Navbar";

const initialState = {
  user: {
    username: "",
    isLoggedIn: false
  }
};

const mockDispatch = jest.fn();

const setup = (testState = {}) => {
  const store = {
    state: { user: { ...initialState.user, ...testState } },
    dispatch: mockDispatch
  };
  return render(<Navbar />, store);
};

afterEach(cleanup);

describe("<NavBar /> component", () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });
  test("it should render withtout crashing", () => {
    const { getByTestId } = setup();
    const component = getByTestId("navbar-component");
    expect(component).toBeTruthy();
  });

  test("it should render the user's name", () => {
    const { getByText } = setup({ username: "John" });
    const user = getByText(/john/i);
    expect(user).toBeTruthy();
  });

  test("it should render a logout button when logged in (isLogggedIn = true)", () => {
    const { getByText } = setup({ isLoggedIn: true });
    const logoutBtn = getByText(/logout/i);
    expect(logoutBtn).toBeTruthy();
  });

  test("it should render a login link when not logged in (isLogggedIn = false)", () => {
    const { getByText } = setup({ isLoggedIn: false });
    const logoutBtn = getByText(/login/i);
    expect(logoutBtn).toBeTruthy();
  });

  test("dispatch should be called when logout is clicked", () => {
    const { getByText } = setup({ isLoggedIn: true });
    const logoutBtn = getByText(/logout/i);
    fireEvent.click(logoutBtn);
    expect(mockDispatch).toHaveBeenCalled();
  });
});
