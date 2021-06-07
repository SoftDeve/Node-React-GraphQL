import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { LOAD_EMPLOYEES } from "../queries/EmployeeLists";
import { useMutation } from "@apollo/client";
import { DELETE_EMPLOYEE } from "../queries/DeleteEmployee";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as actionTypes from "../store/actionTypes"

const jwt = require("jsonwebtoken");

export const EmployeeList = () => {
  const { error, loading, data } = useQuery(LOAD_EMPLOYEES, {
    onError: (err) => {
      alert("Some error occured...");
    },
  });
  const [deleteEmployee, errorMessage] = useMutation(DELETE_EMPLOYEE, {
    onError: (err) => {
      alert("Some error occured...");
    },
  });

  console.log(data);

  useEffect(() => {
    if (data) {
      dispatch({ type: actionTypes.EXISTING_EMPLOYEE, payload: data.employees });
    }
  }, [data]);

  const dispatch = useDispatch();
  const employees = useSelector((state: any) => state.employees);
  let history = useHistory();
  if (error) {
    return <div>Some Error Occured</div>;
  }
  if (loading) {
    return <div>Loadng...</div>;
  }

  const removeEmployee = (id: string) => {
    const token = localStorage.getItem("token");
    const user = jwt.verify(token, "secretkey", function (err: any, decoded: any) {
      if (err) {
        history.push("/");
        return "err";
      }
      return decoded.user;
    });
    if (user === "err") {
      history.push("/");
      return;
    }

    dispatch({ type: actionTypes.REMOVE_EMPLOYEE, payload: id });
    deleteEmployee({
      variables: {
        id,
      },
    });
  };
  return (
    <React.Fragment>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Designation</th>
            <th scope="col">Location</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            <React.Fragment>
              {employees.map((employee: any) => (
                // <div className="employee-div" key={employee.id}>
                //   <div className="employee-heading">
                //     <p>
                //       <strong>Name:</strong>
                //       {employee.name}
                //     </p>
                //     <p>
                //       <strong>Designation:</strong>
                //       {employee.designation}
                //     </p>
                //     <span>
                //       <strong>Location:</strong>
                //       {employee.location}
                //     </span>
                //   </div>
                //   <div className="employee-buttons">
                //     <Link to={`/edit/${employee.id}`} title="Edit Employee">
                //       <button className="btn btn-primary">Edit</button>
                //     </Link>
                //     <button
                //       onClick={() => removeEmployee(employee.id)}
                //       className="btn btn-danger"
                //       title="Remove Employee"
                //     >
                //       Delete
                //     </button>
                //   </div>
                // </div>
                <tr key={employee.id}>
                  <td><div className="container">{employee.name}</div></td>
                  <td><div className="container">{employee.designation}</div></td>
                  <td><div className="container">{employee.location}</div></td>
                  <td>
                    <div className="container">
                      <Link to={`/edit/${employee.id}`} title="Edit Employee">
                        <button className="btn btn-primary">Edit</button>
                      </Link>
                      <button
                        onClick={() => removeEmployee(employee.id)}
                        className="btn btn-danger m-2"
                        title="Remove Employee">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}



            </React.Fragment>
          ) : (
            <tr className="employee-nodata">
              <td>No data present.</td>
              </tr>
          )}

        </tbody>
      </table>
    </React.Fragment>
  );
};
