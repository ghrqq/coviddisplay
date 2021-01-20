import React from "react";
import { Link } from "@reach/router";

export default function Footer(props) {
  return (
    <div style={{ width: "100%" }}>
      <div className="footer">
        <div className="footer-links">
          <ul>
            <li onClick={props.handleClose}>
              <Link to="/">Home</Link>{" "}
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <li onClick={props.handleClose}>
              <Link to="/about">About</Link>{" "}
            </li>
            <li onClick={props.handleClose}>
              <Link to="/list">List</Link>{" "}
            </li>
          </ul>
        </div>
      </div>
      <div className="copy">
        <a rel="noreferrer" href="https://github.com/ghrqq" target="_blank">
          Theo 2021
        </a>{" "}
      </div>
    </div>
  );
}
