import React from "react";
import classes from "./MainHeader.module.css";

const MainHeader = (props: any) => {
  return (
    <header className={classes["main-header"]}>
      <h1>React POC</h1>
    </header>
  );
};

export default MainHeader;
