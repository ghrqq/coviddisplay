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
        <Link to="/contact">Contact</Link>{" "}
      </li>
    </ul>
  );
};

export default Navigation;
