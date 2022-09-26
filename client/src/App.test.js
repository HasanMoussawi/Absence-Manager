import React from "react";
import { shallow } from "enzyme";
import { Home } from "./pages/home/Home.js";

describe("App", () => {
  it("check the Home component", () => {
    const appWrapper = shallow(<Home />);
    appWrapper.find(Home);
  });
});
