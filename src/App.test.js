import React from "react";
import { shallow } from "enzyme";
import App from "./App";

test("renders App without crashing", () => {
  const wrapper = shallow(<App />);
  const component = wrapper.find(".App");
  expect(component.length).toBe(1);
});
