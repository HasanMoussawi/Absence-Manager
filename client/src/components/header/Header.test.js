import React from "react";
import { Header } from "./header.js";
import { shallow } from "enzyme";

describe("Header testing", () => {
  it("should show correct text", () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.text().includes("Absence Manager")).toBe(true);
  });
});
