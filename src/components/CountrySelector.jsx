import React, { useState, useContext } from "react";
import { CountryContext } from "../App";

export default function CountrySelector({ handleChange, defaultCountry }) {
  const [countries] = useContext(CountryContext);

  return (
    <select
      className="country-selector"
      type="select"
      placeholder="Country Name Here"
      value={
        defaultCountry === " "
          ? countries[Math.floor(Math.random() * 100)]["Country"]
          : defaultCountry
      }
      onChange={(e) => handleChange(e.target.value)}
    >
      {countries.map((item) => (
        <option key={item.Country} value={item.CountryCode}>
          {item.Country}
        </option>
      ))}

      {/* <option value="Germany">Germany</option>
      <option value="Turkey">Turkey</option>
      <option value="USA">USA</option>
      <option value="France">France</option> */}
    </select>
  );
}
