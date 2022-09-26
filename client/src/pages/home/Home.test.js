import React from "react";
import { Header } from "../../components/header/header";
import { shallow } from "enzyme";
import Employees from "../../components/employees/Employees.js";

describe("Home testing", () => {
    it("check the Header component", () => {
        const appWrapper = shallow(<Header />);
        appWrapper.find(Header);
    })

    it("check the Employees component", () => {
        const appWrapper = shallow(<Employees />);
        appWrapper.find(Employees);
    })
})