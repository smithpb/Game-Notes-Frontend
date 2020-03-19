import React from "react";
import { shallow } from "enzyme";
import Navbar from "./Navbar";

test.skip("it should render without crashing", () => {
  const wrapper = shallow(<Navbar />);
  const component = wrapper.find(".navbar-container");
  expect(component.length).toBe(1);
});
