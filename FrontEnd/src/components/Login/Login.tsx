import React from "react";
import { useHistory } from "react-router-dom";
// import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import MainHeader from "../MainHeader/MainHeader";
import useInput from "../../hooks/use-input";

const isNotEmail = (value: any) => value.includes("@");
const isNotEmpty = (value: any) => value.trim() !== "" && value.length > 6;
const axios = require("axios");

const Login = (props: any) => {
  let history = useHistory();
  let formIsValid = false;

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(isNotEmail);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(isNotEmpty);

  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const loginHandler = async (email: any, password: any) => {
    try {
      const response = await axios.post("/users/login", { email, password });
      if (response.data.status === "ok") {
        localStorage.setItem("token", response.data.token);
        history.push("/home");
      } else {
        alert("Invalid email or passoword");
      }
    } catch (e) {
      alert("Server is not working");
    }
    // fetch("/users/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     email,
    //     password,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((a) => {
    //     if (a.status === "ok") {
    //       localStorage.setItem("token", a.token);
    //       history.push("/home");
    //     } else {
    //       alert("Invalid email or password");
    //     }
    //   })
    //   .catch(() => {
    //     alert("Server is not working");
    //   });
  };

  const submitHandler = (event: any) => {
    event.preventDefault();
    loginHandler(emailValue, passwordValue);
  };

  return (
    <React.Fragment>
      <div className={classes.login + ' ' + 'card'}>
        <MainHeader />
        <form onSubmit={submitHandler}>
          <div
            className={`${classes.control} ${
              emailIsValid === false ? classes.invalid : ""
            }`}
          >
            <label htmlFor="email">E-Mail</label>
            <input
              type="email"
              id="email"
              value={emailValue}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
            />
            {emailHasError && <p>Enter valid email</p>}
          </div>
          <div
            className={`${classes.control} ${
              passwordIsValid === false ? classes.invalid : ""
            }`}
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={passwordValue}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
            />
            {passwordHasError && <p>Enter valid pass</p>}
          </div>
          <div className={classes.actions}>
            <button
              type="submit"
              className={classes.btn + ' ' + 'btn btn-success'}
              disabled={!formIsValid}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Login;
