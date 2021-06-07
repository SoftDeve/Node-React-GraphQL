import React from "react";
import { Link, useHistory } from "react-router-dom";
import useInput from "../hooks/use-input";
// import Card from "./UI/Card/Card";
import { useSelector, useDispatch } from "react-redux";
import { CREATE_EMPLOYEE } from "../queries/AddEmployee";
import { useMutation } from "@apollo/client";
import { LOAD_EMPLOYEES } from "../queries/EmployeeLists";
import * as actionTypes from "../store/actionTypes"

const isNotEmpty = (value: any) => value.trim() !== "";
const { v4: uuidv4 } = require("uuid");

export const AddEmployee = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [addEmployee, { error }] = useMutation(CREATE_EMPLOYEE, {
    onError: (err) => {
      alert("Employee already exist");
    },
  });
  const employees = useSelector((state: any) => state.employees);
  console.log(error);
  // console.log(employees);
  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput(isNotEmpty);
  const {
    value: locationValue,
    isValid: locationIsValid,
    hasError: locationHasError,
    valueChangeHandler: locationChangeHandler,
    inputBlurHandler: locationBlurHandler,
  } = useInput(isNotEmpty);
  const {
    value: designationValue,
    isValid: designationIsValid,
    hasError: designationHasError,
    valueChangeHandler: designationChangeHandler,
    inputBlurHandler: designationBlurHandler,
  } = useInput(isNotEmpty);
  let formIsValid = false;
  if (nameIsValid && locationIsValid && designationIsValid) {
    formIsValid = true;
  }
  const onSubmit = (e: any) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }
    const newEmployee = {
      id: employees.length + 1,
      name: nameValue,
      location: locationValue,
      designation: designationValue,
    };
    addEmployee({
      variables: {
        id: uuidv4(),
        name: nameValue,
        location: locationValue,
        designation: designationValue,
      },
      refetchQueries: [{ query: LOAD_EMPLOYEES }],
    });
    // fetch("/employees", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(newEmployee),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    dispatch({ type: actionTypes.ADD_EMPLOYEE, payload: newEmployee });
    // })
    // .catch(() => {
    //   alert("Some error occured...");
    //   history.push("/");
    // });
    history.push("/home");
  };
  return (
    <div className="card">
      <form onSubmit={onSubmit}>
        <div className="control">
          <label htmlFor="name">Name of employee</label>
          <input
            value={nameValue}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            type="text"
            placeholder="Enter name"
          />
          {nameHasError && <span>Enter the name..</span>}
        </div>

        <div className="control">
          <label htmlFor="location">Location</label>
          <input
            value={locationValue}
            onChange={locationChangeHandler}
            onBlur={locationBlurHandler}
            type="text"
            placeholder="Enter location"
          />
          {locationHasError && <p>Enter the loca..</p>}
        </div>
        <div className="control">
          <label htmlFor="designation">Designation</label>
          <input
            value={designationValue}
            onChange={designationChangeHandler}
            onBlur={designationBlurHandler}
            type="text"
            placeholder="Enter designation"
          />
          {designationHasError && <p>Enter the desig..</p>}
        </div>
        <div className="actions">
          <button className="btn btn-success" type="submit" disabled={!formIsValid}>
            Add Employee
          </button>
        </div>
        <div className="actions m-2">
          <Link to="/home">
            <button className="btn btn-warning m-2">Cancel</button>
          </Link>
        </div>
      </form>
    </div>
  );
};
