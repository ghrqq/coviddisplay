import React, { useState, useEffect, useRef } from "react";
import useWindowDimensions from "../tools/useWindowDimensions";
import rotate from "./rotate.svg";
import resize from "./resize.svg";
import { isMobile } from "react-device-detect";
import CountrySelector from "./CountrySelector";

export default function CompareCountries(props) {
  const initialValues = useRef(props.countryArr);
  const { width } = useWindowDimensions();
  const [countriesToCompare, setcountriesToCompare] = useState(
    props.countryArr
  );
  const [global, setglobal] = useState(props.global);

  const handleChange = (e) => {
    console.log(JSON.stringify(e));
  };

  useEffect(() => {
    setcountriesToCompare(props.countryArr);
  }, [props]);

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

      {/* {JSON.stringify(props.countryArr)} &&& {JSON.stringify(props.global)} */}
      {countriesToCompare.length < 2 ? (
        <h2>Please choose at least 2 countries to compare</h2>
      ) : (
        <table>
          <tr>
            <td>
              <div className="country-name">
                <CountrySelector
                  defaultCountry={countriesToCompare[0].CountryCode}
                  handleChange={handleChange}
                  key={0}
                  order={0}
                />
                {/* TODO props and change handler will be added */}
              </div>
            </td>
            <td></td>
            <td>
              <div className="country-name">
                <CountrySelector
                  defaultCountry={countriesToCompare[1].CountryCode}
                  handleChange={handleChange}
                  key={1}
                  order={1}
                />
                {/* TODO props and change handler will be added */}
              </div>
            </td>
          </tr>
        </table>
      )}
    </div>
  );
}
