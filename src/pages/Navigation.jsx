import React from "react";
import { Link } from "@reach/router";

const Navigation = (props) => {
  return (
    <ul id="nav">
      <li onClick={props.handleClose}>
        <Link to="/">Home</Link>{" "}
      </li>
      <li onClick={props.handleClose}>
        <Link to="/about">About</Link>{" "}
      </li>
      <li onClick={props.handleClose}>
        <Link to="/list">List</Link>{" "}
      </li>
    </ul>
  );
};

export default Navigation;
