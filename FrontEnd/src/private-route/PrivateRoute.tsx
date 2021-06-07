import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

const jwt = require("jsonwebtoken");

const PrivateRoute = (routeRrops: RouteProps) => {
  const token = localStorage.getItem("token");
  const user = jwt.verify(token, "secretkey", function (err: any, decoded: any) {
    if (err) {
      return "err";
    }
    return decoded.user;
  });
  return user !== 'err' ? (<Route path={routeRrops.path} exact={routeRrops.exact} component={routeRrops.component} />) :
    (<Redirect to="/" />);
};

export default PrivateRoute;
