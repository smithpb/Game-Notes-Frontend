import React from "react";
import { render, fireEvent, cleanup } from "../../util/tests/test-utils";
import "@testing-library/jest-dom/extend-expect";
import Register from "./Register";

afterEach(cleanup);

describe("<Register />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = render(<Register />);
  });

  test("it should render without error", () => {
    const component = wrapper.getByTestId("register-component");
    expect(component).toBeTruthy();
  });

  test("it should render 6 input fields", () => {
    const inputFields = wrapper.getAllByTestId(/register-form-input.*/);
    expect(inputFields.length).toBe(6);
    const fields = [
      "firstName",
      "lastName",
      "email",
      "username",
      "password",
      "confirmPassword",
    ];
    inputFields.forEach((input, i) => {
      expect(input).toHaveAttribute("name", fields[i]);
    });
  });

  test("triggers event handler on input", () => {
    const inputFields = wrapper.getAllByTestId(/register-form-input.*/);
    const testInput = "test value";
    inputFields.forEach((input) => {
      fireEvent.change(input, { target: { value: testInput } });
      expect(input.value).toMatch(testInput);
    });
  });

  test("it should display error message when firstName field is blank", () => {
    const inputFields = wrapper.getAllByTestId(/register-form-input.*/);
    const testInput = "test value";
    inputFields.forEach((input, i) => {
      if (i !== 0) {
        fireEvent.change(input, { target: { value: testInput } });
      }
    });
    const form = wrapper.getByTestId("register-form");
    fireEvent.submit(form);
    expect(wrapper.getByText(/required field/i)).toBeInTheDocument();
  });

  describe("Password and confirm password inputs", () => {
    test("confirmPassword should have class 'differ' when inputs do not match", () => {
      const passwordInput = wrapper.getByTestId(/.*password/);
      const confirmInput = wrapper.getByTestId(/.*confirm/);
      const password = "Test123!";
      const confirm = "Test456!";
      fireEvent.change(passwordInput, { target: { value: password } });
      fireEvent.change(confirmInput, { target: { value: confirm } });
      expect(confirmInput).toHaveClass("differ");
    });
    test("confirmPassword should have class 'match' when inputs do match", () => {
      const passwordInput = wrapper.getByTestId(/.*password/);
      const confirmInput = wrapper.getByTestId(/.*confirm/);
      const password = "Test123!";
      fireEvent.change(passwordInput, { target: { value: password } });
      fireEvent.change(confirmInput, { target: { value: password } });
      expect(confirmInput).toHaveClass("match");
    });
  });
});
