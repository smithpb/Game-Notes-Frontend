import React from "react";
import { render, fireEvent, cleanup } from "../../../util/tests/test-utils";
import CampaignForm from "./CampaignForm";

afterEach(cleanup);

describe("CampaignForm component", () => {
  test("should render without error", () => {
    const { getByTestId } = render(<CampaignForm />);
    const component = getByTestId("camp-form-component");
    expect(component).not.toBeNull();
  });
  test("should render 3 input fields", () => {
    const { getAllByTestId } = render(<CampaignForm />);
    const inputFields = getAllByTestId("camp-form-input");
    expect(inputFields.length).toBe(3);
  });
  test("should render a submit button", () => {
    const { getByTestId } = render(<CampaignForm />);
    const submitBtn = getByTestId("camp-form-submit");
    expect(submitBtn).not.toBeNull();
  });
});

describe("Form functionality", () => {
  test("should match values with inputs", () => {
    const { getAllByTestId } = render(<CampaignForm />);
    const fields = getAllByTestId("camp-form-input");
    fireEvent.change(fields[0], { target: { name: "name", value: "John" } });
    expect(fields[0].value).toBe("John");

    fireEvent.change(fields[1], { target: { name: "DM", value: "Sally" } });
    expect(fields[1].value).toBe("Sally");

    fireEvent.change(fields[2], {
      target: { name: "description", value: "Nothing here" }
    });
    expect(fields[2].value).toBe("Nothing here");
  });

  test("should call the dispatch function when the form submits", () => {
    const mockDispatch = jest.fn();
    const { getByTestId } = render(<CampaignForm />, {
      dispatch: mockDispatch
    });
    const form = getByTestId("camp-form");
    fireEvent.submit(form);
    expect(mockDispatch).toHaveBeenCalled();
  });
});
