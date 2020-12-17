import React from "react";
import img1 from "../worldLow.svg";

const CountryBox = () => {
  return (
    <div className="country-box">
      <div id="country-image-box">
        <img src={img1} />{" "}
      </div>
      <div id="country-info"></div>
    </div>
  );
};

export default CountryBox;
