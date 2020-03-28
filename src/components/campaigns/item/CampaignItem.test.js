import React from "react";
import { render } from "../../../util/tests/test-utils";
import CampaignItem from "./CampaignItem";

const defaultProps = {
  id: "1",
  name: "First run",
  DM: "John",
  description: "The best one"
};

describe("<CampaignItem /> component", () => {
  it("should render without crashing", () => {
    const { getByTestId } = render(<CampaignItem campaign={defaultProps} />);
    expect(getByTestId("campaign-list-item")).toBeTruthy();
  });
});
