import Employees from "../../components/employees/Employees.js";
import { Header } from "../../components/header/Header";
import "./home.css";

/*
  - home.css includes the style of the Home page
  - this page contains the Header component and the Employees component 
*/
export const Home = () => {
  return (
    <div className="homeContainer">
      <Header />
      <Employees />
    </div>
  );
};
