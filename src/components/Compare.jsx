import React, { useState, useContext, useEffect } from "react";
import { CountryContext, GlobalRate, GlobalData } from "../App";

import ScreenSizeChecker from "./ScreenSizeChecker";

import CountryMap from "./CountryMap";
import CountrySelector from "./CountrySelector";
import arrow from "./arrow.svg";

export default function Compare(props) {
  const [countries] = useContext(CountryContext);
  const [selection, setselection] = useState([props.country, props.country2]);
  const [rates] = useContext(GlobalRate);
  const [data] = useContext(GlobalData);

  // useEffect(() => {
  //   let tempArr = [];
  //   const firstToCompare = countries.filter(
  //     (item) => item.CountryCode === props.country
  //   );
  //   const secondToCompare = countries.filter(
  //     (item) => item.CountryCode === props.country2
  //   );
  //   tempArr = [...firstToCompare, ...secondToCompare];
  //   setselection(tempArr);
  // }, [props]);

  const arrowHandler = (val1, val2, global) => {
    if (val1 > val2 && val1 > global) {
      return (
        <img
          alt="A red arrow upwards."
          src={arrow}
          className="arrow filter-red"
        />
      );
    }
    if (val1 < val2 && val1 > global) {
      return (
        <img
          alt="A red arrow downwards."
          src={arrow}
          className="arrow filter-red arrow-down"
        />
      );
    }
    if (val1 < val2 && val1 < global) {
      return (
        <img
          alt="A green arrow downwards."
          src={arrow}
          className="arrow filter-green arrow-down"
        />
      );
    }
    if (val1 > val2 && val1 < global) {
      return (
        <img
          alt="A green arrow upwards."
          src={arrow}
          className="arrow filter-green"
        />
      );
    }
  };

  const handleChange = (e, order) => {
    let val = e.target.value;
    let tempArr = [...selection];

    tempArr[order] = countries.filter((item) => item.CountryCode === val)[0][
      "CountryCode"
    ];

    setselection(tempArr);
  };

  const dataProvider = (code, i) => {
    let country = countries.filter((item) => item.CountryCode === code);
    return country[0][i];
  };

  if (selection.length < 2)
    return <h2>Please select 2 countries to compare.</h2>;

  return (
    <div>
      <ScreenSizeChecker />
      <div className="compare-container">
        <div className="compare-closer" onClick={props.handleClose}>
          Close &times;
        </div>
        <div className="compare-header">
          <div>
            <CountryMap
              code={selection[0]}
              filter={
                dataProvider(selection[0], "NewDeaths") /
                  dataProvider(selection[0], "TotalDeaths") >
                rates.GlobalDeathRate
                  ? "filter-red"
                  : "filter-green"
              }
            />

            <CountrySelector
              defaultCountry={selection[0]}
              order="0"
              handleChange={handleChange}
            />
          </div>
          <div>
            <CountryMap
              code={selection[1]}
              filter={
                dataProvider(selection[1], "NewDeaths") /
                  dataProvider(selection[1], "TotalDeaths") >
                rates.GlobalDeathRate
                  ? "filter-red"
                  : "filter-green"
              }
            />
            <CountrySelector
              defaultCountry={selection[1]}
              order="1"
              handleChange={handleChange}
            />
          </div>
        </div>
        <table>
          <tbody>
            <tr>
              <td>{dataProvider(selection[0], "NewConfirmed")}</td>
              <td>
                {arrowHandler(
                  dataProvider(selection[0], "NewConfirmed"),
                  dataProvider(selection[1], "NewConfirmed"),
                  rates.GlobalCaseRate
                )}
              </td>
              <td>
                New Cases
                <div className="data-exp">{data.NewConfirmed}</div>
              </td>
              <td>
                {arrowHandler(
                  dataProvider(selection[1], "NewConfirmed"),
                  dataProvider(selection[0], "NewConfirmed"),
                  rates.GlobalCaseRate
                )}
              </td>
              <td>{dataProvider(selection[1], "NewConfirmed")}</td>
            </tr>
            <tr>
              <td>{dataProvider(selection[0], "TotalConfirmed")}</td>
              <td>
                {arrowHandler(
                  dataProvider(selection[0], "TotalConfirmed"),
                  dataProvider(selection[1], "TotalConfirmed"),
                  rates.GlobalCaseRate
                )}
              </td>
              <td>
                Total Cases
                <div className="data-exp">{data.TotalConfirmed}</div>
              </td>
              <td>
                {arrowHandler(
                  dataProvider(selection[1], "TotalConfirmed"),
                  dataProvider(selection[0], "TotalConfirmed"),
                  rates.GlobalCaseRate
                )}
              </td>
              <td>{dataProvider(selection[1], "TotalConfirmed")}</td>
            </tr>
            <tr>
              <td>{dataProvider(selection[0], "NewDeaths")}</td>
              <td>
                {arrowHandler(
                  dataProvider(selection[0], "NewDeaths"),
                  dataProvider(selection[1], "NewDeaths"),
                  rates.GlobalDeathRate
                )}
              </td>
              <td>
                New Deaths
                <div className="data-exp">{data.NewDeaths}</div>
              </td>
              <td>
                {arrowHandler(
                  dataProvider(selection[1], "NewDeaths"),
                  dataProvider(selection[0], "NewDeaths"),
                  rates.GlobalDeathRate
                )}
              </td>
              <td>{dataProvider(selection[1], "NewDeaths")}</td>
            </tr>
            <tr>
              <td>{dataProvider(selection[0], "TotalDeaths")}</td>
              <td>
                {arrowHandler(
                  dataProvider(selection[0], "TotalDeaths"),
                  dataProvider(selection[1], "TotalDeaths"),
                  rates.GlobalDeathRate
                )}
              </td>
              <td>
                Total Deaths
                <div className="data-exp">{data.TotalDeaths}</div>
              </td>
              <td>
                {arrowHandler(
                  dataProvider(selection[1], "TotalDeaths"),
                  dataProvider(selection[0], "TotalDeaths"),
                  rates.GlobalDeathRate
                )}
              </td>
              <td>{dataProvider(selection[1], "TotalDeaths")}</td>
            </tr>
            <tr>
              <td>{dataProvider(selection[0], "NewRecovered")}</td>
              <td>
                {arrowHandler(
                  dataProvider(selection[0], "NewRecovered"),
                  dataProvider(selection[1], "NewRecovered"),
                  rates.GlobalRecoveryRate
                )}
              </td>
              <td>
                New Recovery
                <div className="data-exp">{data.NewRecovered}</div>
              </td>
              <td>
                {arrowHandler(
                  dataProvider(selection[1], "NewRecovered"),
                  dataProvider(selection[0], "NewRecovered"),
                  rates.GlobalRecoveryRate
                )}
              </td>
              <td>{dataProvider(selection[1], "NewRecovered")}</td>
            </tr>
            <tr>
              <td>{dataProvider(selection[0], "TotalRecovered")}</td>
              <td>
                {arrowHandler(
                  dataProvider(selection[0], "TotalRecovered"),
                  dataProvider(selection[1], "TotalRecovered"),
                  rates.GlobalRecoveryRate
                )}
              </td>
              <td>
                Total Recovery
                <div className="data-exp">{data.TotalRecovered}</div>
              </td>
              <td>
                {arrowHandler(
                  dataProvider(selection[1], "TotalRecovered"),
                  dataProvider(selection[0], "TotalRecovered"),
                  rates.GlobalRecoveryRate
                )}
              </td>
              <td>{dataProvider(selection[1], "TotalRecovered")}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
