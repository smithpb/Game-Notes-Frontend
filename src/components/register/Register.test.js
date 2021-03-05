import React from "react";
import { render, fireEvent, cleanup, act } from "../../util/tests/test-utils";
import "@testing-library/jest-dom/extend-expect";
import Register from "./Register";
// import { act } from "react-dom/test-utils";

afterEach(cleanup);

describe("<Register />", () => {
  let wrapper;
  beforeEach(() => {
    act(() => {
      wrapper = render(<Register />);
    });
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
      act(() => {
        fireEvent.change(input, { target: { value: testInput } });
      });
      expect(input.value).toMatch(testInput);
    });
  });

  // test("it should display error message when firstName field is blank", () => {
  //   const inputFields = wrapper.getAllByTestId(/register-form-input.*/);
  //   const testInput = "test value";
  //   act(() => {
  //     inputFields.forEach((input, i) => {
  //       // console.log(input.target.value);
  //       if (i !== 0) {
  //         fireEvent.change(input, { target: { value: testInput } });
  //       }
  //     });
  //     const form = wrapper.getByTestId("register-form");
  //     fireEvent.submit(form);
  //   });
  //   expect(wrapper.getByText(/required field/i)).toBeInTheDocument();
  // });

  describe("Password and confirm password inputs", () => {
    test("confirmPassword should have class 'differ' when inputs do not match", () => {
      const passwordInput = wrapper.getByLabelText(/^password/i);
      const confirmInput = wrapper.getByLabelText(/confirm password/i);
      const password = "Test123!";
      const confirm = "Test456!";
      act(() => {
        fireEvent.change(passwordInput, { target: { value: password } });
        fireEvent.change(confirmInput, { target: { value: confirm } });
      });
      expect(confirmInput).toHaveClass("differ");
    });
    test("confirmPassword should have class 'match' when inputs do match", () => {
      const passwordInput = wrapper.getByLabelText(/^password/i);
      const confirmInput = wrapper.getByLabelText(/confirm password/i);
      const password = "Test123!";
      fireEvent.change(passwordInput, { target: { value: password } });
      fireEvent.change(confirmInput, { target: { value: password } });
      expect(confirmInput).toHaveClass("match");
    });
  });
});
