import { createStore } from "redux";
import { IEmployee } from "../models/employee"
import * as actionTypes from "./actionTypes"

const initialState = {
  employees: [],
};

const employeeReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.ADD_EMPLOYEE:
      return {
        ...state,
        employees: [...state.employees, action.payload],
      };

    case actionTypes.EDIT_EMPLOYEE:
      const updatedEmployee = action.payload;

      const updatedEmployees = state.employees.map((employee: IEmployee) => {
        if (employee.id === updatedEmployee.id) {
          return updatedEmployee;
        }
        return employee;
      });

      return {
        ...state,
        employees: updatedEmployees,
      };
    case actionTypes.EXISTING_EMPLOYEE:
      return {
        ...state,
        employees: action.payload,
      };

    case actionTypes.REMOVE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter(
          (employee: any) => employee.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

const store = createStore(employeeReducer);

export default store;
