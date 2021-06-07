import React, { useState, useEffect } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
// import Card from "../components/UI/Card/Card";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { LOAD_EMPLOYEES } from "../queries/EmployeeLists";
import { EDIT_EMPLOYEE } from "../queries/EditEmployee";
import * as actionTypes from "../store/actionTypes"

export const EditEmployee = () => {
  const [editEmployee, { error }] = useMutation(EDIT_EMPLOYEE, {
    onError: (err) => {
      alert("Some error occured");
    },
  });
  let history = useHistory();
  const dispatch = useDispatch();
  const employees = useSelector((state: any) => state.employees);
  // console.log(employees);
  const [selectedUser, setSelectedUser] = useState({
    id: null,
    name: "",
    designation: "",
    location: "",
  });
  const params: any = useParams();
  const currentUserId = params.id;
  useEffect(() => {
    const employeeId = currentUserId;
    const selectedUser = employees.find(
      (currentEmployeeTraversal: any) => currentEmployeeTraversal.id === employeeId
    );
    setSelectedUser(selectedUser);
    console.log(selectedUser);
  }, [currentUserId, employees]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    //   fetch("/employees", {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(selectedUser),
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    editEmployee({
      variables: {
        id: selectedUser.id,
        name: selectedUser.name,
        location: selectedUser.location,
        designation: selectedUser.designation,
      },
      refetchQueries: [{ query: LOAD_EMPLOYEES }],
    });
    dispatch({ type: actionTypes.EDIT_EMPLOYEE, payload: selectedUser });
    // })
    // .catch(() => {
    //   alert("Some error occured...");
    //   history.push("/");
    // });
    history.push("/home");
  };

  const handleOnChange = (userKey: any, newValue: any) =>
    setSelectedUser({ ...selectedUser, [userKey]: newValue });

  if (!selectedUser || !selectedUser.id) {
    return <div>Invalid Employee ID.</div>;
  }

  return (
    <div className="card">
      <form onSubmit={onSubmit}>
        <div className="control">
          <label htmlFor="name">Name of employee</label>
          <input
            value={selectedUser.name}
            onChange={(e) => handleOnChange("name", e.target.value)}
            type="text"
            placeholder="Enter name"
          />
        </div>
        <div className="control">
          <label htmlFor="location">Location</label>
          <input
            value={selectedUser.location}
            onChange={(e) => handleOnChange("location", e.target.value)}
            type="text"
            placeholder="Enter location"
          />
        </div>
        <div className="control">
          <label htmlFor="designation">Designation</label>
          <input
            value={selectedUser.designation}
            onChange={(e) => handleOnChange("designation", e.target.value)}
            type="text"
            placeholder="Enter designation"
          />
        </div>
        <div className="actions">
          <button type="submit" className="btn btn-success">
            Edit Employee
          </button>
        </div>
        <div className="actions m-2">
          <Link to="/home">
            <button className="btn btn-warning">Cancel</button>
          </Link>
        </div>
      </form>
    </div>
  );
};
