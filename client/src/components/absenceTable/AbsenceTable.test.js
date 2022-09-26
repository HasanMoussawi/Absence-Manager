import { shallow } from "enzyme";
import Employees from "../employees/Employees.js";
import { Loader } from "../loader/Loader.js";

describe("AbsenceTable testing", () => {
  it("check the Loading component", () => {
    const appWrapper = shallow(<Loader />);
    appWrapper.find(Loader);
  });

  it("check the Employees component", () => {
    const appWrapper = shallow(<Employees />);
    appWrapper.find(Employees);
  });

  it("check the Loader component", () => {
    const appWrapper = shallow(<Loader />);
    appWrapper.find(Loader).exists();
  });


});
