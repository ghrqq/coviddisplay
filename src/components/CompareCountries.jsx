import React, { useState, useContext } from "react";

import CountrySelector from "./CountrySelector";
import { CountryContext } from "../App";
import ScreenSizeChecker from "./ScreenSizeChecker";

import CountryMap from "./CountryMap";

export default function CompareCountries(props) {
  const [countries] = useContext(CountryContext);

  const [countriesToCompare, setcountriesToCompare] = useState(
    props.countryArr
  );

  const handleChange = (e, num) => {
    let val = e.target.value;
    let tempArr = [...countriesToCompare];
    const newCountry = countries.filter((item) => item.CountryCode === val);

    tempArr[num] = newCountry[0];
    setcountriesToCompare(tempArr);
  };

  return (
    <div>
      <ScreenSizeChecker />

      {countriesToCompare.length < 2 ? (
        <h2>Please choose at least 2 countries to compare</h2>
      ) : (
        <table>
          <tr>
            <td>
              <CountryMap code={countriesToCompare[0].CountryCode} />
            </td>
            <td></td>
            <td>
              <CountryMap code={countriesToCompare[1].CountryCode} />
            </td>
          </tr>
          <tr>
            <td>
              <div className="country-name">
                <CountrySelector
                  defaultCountry={countriesToCompare[0].CountryCode}
                  handleChange={handleChange}
                  key={0}
                  order="0"
                />
              </div>
            </td>
            <td>Global</td>
            <td>
              <div className="country-name">
                <CountrySelector
                  defaultCountry={countriesToCompare[1].CountryCode}
                  handleChange={handleChange}
                  key={1}
                  order="1"
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>{countriesToCompare[0].CountryCode}</td>
            <td></td>
            <td>{countriesToCompare[1].CountryCode}</td>
          </tr>
        </table>
      )}
    </div>
  );
}
