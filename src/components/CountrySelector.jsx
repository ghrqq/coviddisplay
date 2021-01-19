import React, { useContext } from "react";
import { CountryContext } from "../App";

export default function CountrySelector({
  handleChange,
  defaultCountry,
  order,
}) {
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
      onChange={(e) => handleChange(e, order)}
    >
      {countries.map((item) => (
        <option key={item.Country} value={item.CountryCode}>
          {item.Country}
        </option>
      ))}
    </select>
  );
}
