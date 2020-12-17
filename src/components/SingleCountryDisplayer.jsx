import React, { useState, useEffect, useContext } from "react";
import { CountryContext } from "../App";

const SingleCountryDisplayer = (props) => {
  const [countries] = useContext(CountryContext);
  const [pickedCountry, setpickedCountry] = useState("");
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    function countryPicker(val) {
      if (countries === undefined) {
        return null;
      } else {
        const result = countries.find((item) => item.Country === val);
        if (result === undefined) {
          setisLoading(true);
        }
        setpickedCountry(result);
        setisLoading(false);
      }
    }
    countryPicker(props.val);
  }, [props]);

  return (
    <div>
      {pickedCountry === "" || pickedCountry === undefined ? (
        <h2>Loading</h2>
      ) : (
        <ul>
          <li>Country: {pickedCountry.Country} </li>
          <li>New Confirmed Cases: {pickedCountry.NewConfirmed} </li>
          <li>Total Confirmed Cases: {pickedCountry.TotalConfirmed} </li>
          <li>New Deaths: {pickedCountry.NewDeaths} </li>
          <li>Total Deaths: {pickedCountry.TotalDeaths} </li>
          <li>New Recovered: {pickedCountry.NewRecovered} </li>
          <li>Total Recovered {pickedCountry.TotalRecovered} </li>
          <li>Last Update: {pickedCountry.Date} </li>
        </ul>
      )}
    </div>
  );
};

export default SingleCountryDisplayer;
