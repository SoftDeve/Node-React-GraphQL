import React, { MouseEvent } from "react";
import { Heading } from "./Heading";
import { EmployeeList } from "./EmployeeList";
import { useHistory } from "react-router-dom";
export const Home = () => {

  let history = useHistory();

  const onLogout = async (props: MouseEvent<HTMLElement>) => {
    localStorage.removeItem("token");
    history.push("/");
  };

  return (
    <React.Fragment>
      <div className="container home-div">
          <nav className="navbar navbar-light bg-light justify-content-end p-3">
                <button className="btn btn-outline-warning my-2 my-sm-0" onClick={onLogout}>Logout</button>
          </nav>
          {/* <Button onClick={onLogout}>Logout</Button> */}
          <Heading />
          <EmployeeList />
        </div>
    </React.Fragment>
  );
};
