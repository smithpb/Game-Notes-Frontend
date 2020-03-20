import React, { useCallback } from "react";
import { shallow, mount } from "enzyme";
import CampaignList from "./CampaignList";

// This should be called in place of the reducer's dispatch function
const mockDispatch = jest.fn();

const initialState = {
  list: []
};

/**
 * Function to setup the Login component for testing.
 * @param {object} state - State information that will be specific to each test
 * @returns {ReactWrapper}
 */
const setup = (state = {}) => {
  // Resets the jest.fn() to prevent overlaps between tests
  mockDispatch.mockClear();
  const newState = { ...initialState, ...state };

  const fullState = { campaigns: newState };
  console.log(fullState);

  // Replace the React hook with mock test versions
  const mockUseContext = jest.fn().mockReturnValue({
    state: fullState,
    dispatch: mockDispatch
  });
  React.useContext = mockUseContext;

  return mount(<CampaignList />);
};

describe.skip("CampaignList component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CampaignList />);
  });

  test("it should render without crashing", () => {
    const component = wrapper.find(".campaign-list-container");
    expect(component.length).toBe(1);
  });

  test("it should render a button to add a new campaign", () => {
    const component = wrapper.find(".camp-add-btn");
    expect(component.length).toBe(1);
  });

  test("it should render a number of campaigns in a list equal to what is in store", () => {
    const campList = { list: [{ id: 1 }, { id: 2 }, { id: 3 }] };
    wrapper = setup(campList);
    const list = wrapper.find(".camp-container");
    expect(list.length).toBe(3);
  });
});
