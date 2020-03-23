import React from "react";
import "@testing-library/jest-dom";
import { render, cleanup } from "../../../util/tests/test-utils";
import CampaignList from "./CampaignList";

afterEach(cleanup);

describe("CampaignList component", () => {
  test("it should render without crashing", () => {
    const { getByTestId } = render(<CampaignList />);
    const component = getByTestId("campaign-list-component");
    // console.log(component);
    expect(component).not.toBeNull();
  });

  test("it should render a button to add a new campaign", () => {
    const { getByTestId } = render(<CampaignList />);
    const addBtn = getByTestId("campaign-add-button");
    expect(addBtn).not.toBeNull();
  });

  test("it should render a list of items from rawList", () => {
    const custState = {
      campaigns: {
        rawList: [
          { name: "1", id: 1 },
          { name: "2", id: 2 },
          { name: "3", id: 3 }
        ]
      }
    };
    const { getAllByTestId } = render(<CampaignList />, { state: custState });
    const list = getAllByTestId("campaign-list-item");
    // console.log(list.children.length);
    expect(list.length).toBe(3);
    expect(list[2].textContent).toMatch(/3/i);
  });
});
