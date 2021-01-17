import React from "react";
import { Link } from "@reach/router";

const Navigation = () => {
  return (
    <ul id="nav">
      <li>
        <Link to="/">Home</Link>{" "}
      </li>
      <li>
        <Link to="/about">About</Link>{" "}
      </li>
      <li>
        <Link to="/list">List</Link>{" "}
      </li>
    </ul>
  );
};

export default Navigation;
