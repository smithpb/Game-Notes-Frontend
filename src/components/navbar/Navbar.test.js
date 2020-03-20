import React from "react";
import { shallow, mount } from "enzyme";
import Navbar from "./Navbar";

const initialState = {
  user: {
    isLoggedIn: false
  }
};

const mockDispatch = jest.fn();

const setup = (state = {}) => {
  // Resets the jest.fn() to prevent overlaps between tests
  mockDispatch.mockClear();
  const newState = { ...initialState, ...state };

  // Replace the React hook with mock test versions
  const mockUseContext = jest
    .fn()
    .mockReturnValue({ state: newState, dispatch: mockDispatch });
  React.useContext = mockUseContext;

  return mount(<Navbar />);
};

test.skip("it should render without crashing", () => {
  const wrapper = shallow(<Navbar />);
  const component = wrapper.find(".navbar-container");
  expect(component.length).toBe(1);
});

describe("Logout button", () => {
  test("it should render the logout button when isLogginIn is true", () => {
    const wrapper = setup({ user: { isLoggedIn: true } });
    const logoutBtn = wrapper.find(".logout-button");
    expect(logoutBtn.length).toBe(1);
  });
  test.skip("it should render the login button when isLogginIn is false", () => {
    const wrapper = setup({ user: { isLoggedIn: false } });
    const loginBtn = wrapper.find(".login-button");
    expect(loginBtn.length).toBe(1);
  });
});
