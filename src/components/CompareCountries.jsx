import React, { useState, useEffect, useContext } from "react";
import useWindowDimensions from "../tools/useWindowDimensions";
import rotate from "./rotate.svg";
import resize from "./resize.svg";
import { isMobile } from "react-device-detect";
import CountrySelector from "./CountrySelector";
import { CountryContext } from "../App";
import preloader from "./preloader.gif";

import CountryMap from "./CountryMap";

export default function CompareCountries(props) {
  const [countries] = useContext(CountryContext);
  const [countryMap, setcountryMap] = useState(preloader);
  const [country2Map, setcountry2Map] = useState(preloader);
  const [filter, setfilter] = useState("filter-green");

  const { width } = useWindowDimensions();
  const [countriesToCompare, setcountriesToCompare] = useState(
    props.countryArr
  );
  const [global, setglobal] = useState(props.global);

  const handleChange = (e, num) => {
    let val = e.target.value;
    let tempArr = [...countriesToCompare];
    const newCountry = countries.filter((item) => item.CountryCode === val);

    tempArr[num] = newCountry[0];
    setcountriesToCompare(tempArr);
  };

  return (
    <div>
      {width < 568 && isMobile ? (
        <div className="screen-size-alert">
          <img src={rotate} />
          Please rotate your screen to display this page correctly.
        </div>
      ) : width < 568 ? (
        <div className="screen-size-alert">
          <img src={resize} />
          Please enlarge your screen to display this page correctly.
        </div>
      ) : null}

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
                {/* TODO props and change handler will be added */}
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
                {/* TODO props and change handler will be added */}
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
