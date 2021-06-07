import React from "react";
import { Link } from "react-router-dom";

export const Heading = () => {
  return (
    <div className="container p-3">
      <div className="row">
      <div className="col">
        <h2 className="">Employee Listing</h2>
        </div>
        <div className="col text-right">
          <Link to="/add">
            <button className="btn btn-success">
              <span>Add Employee</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
