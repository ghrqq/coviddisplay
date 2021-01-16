import React, { useState, useContext, useEffect } from "react";
import { CountryContext, GlobalRate, GlobalData } from "../App";
import CompareCountries from "../components/CompareCountries";
import ScreenSizeChecker from "../components/ScreenSizeChecker";
import { flatten } from "lodash";
import CountryMap from "../components/CountryMap";
import CountrySelector from "../components/CountrySelector";
import arrow from "./arrow.svg";

export default function Compare(props) {
  const [countries] = useContext(CountryContext);
  const [selection, setselection] = useState([]);
  const [rates] = useContext(GlobalRate);
  const [data] = useContext(GlobalData);
  const [keys, setkeys] = useState([]);
  const [premiumKeys, setpremiumKeys] = useState([]);

  useEffect(() => {
    let tempArr = [];
    const firstToCompare = countries.filter(
      (item) => item.CountryCode === props.country
    );
    const secondToCompare = countries.filter(
      (item) => item.CountryCode === props.country2
    );
    tempArr = [...firstToCompare, ...secondToCompare];
    setselection(tempArr);
    if (tempArr.length > 0) {
      let iterationKeys = Object.keys(tempArr[0]).slice(4, -1);
      setkeys(iterationKeys);
    }
  }, [props]);

  const arrowHandler = (val1, val2, global) => {
    if (val1 > val2 && val1 > global) {
      return <img src={arrow} className="arrow filter-red" />;
    }
    if (val1 < val2 && val1 > global) {
      return <img src={arrow} className="arrow filter-red arrow-down" />;
    }
    if (val1 < val2 && val1 < global) {
      return <img src={arrow} className="arrow filter-green arrow-down" />;
    }
    if (val1 > val2 && val1 < global) {
      return <img src={arrow} className="arrow filter-green" />;
    }
  };

  const handleChange = (e, order) => {
    let val = e.target.value;
    let tempArr = [...selection];

    tempArr[order] = countries.filter((item) => item.CountryCode === val)[0];

    setselection(tempArr);
  };

  if (selection.length < 2)
    return <h2>Please select 2 countries to compare.</h2>;

  return (
    <div>
      <ScreenSizeChecker />

      <div className="compare-container">
        <div className="compare-header">
          <div>
            <CountryMap
              code={selection[0].CountryCode}
              filter={
                selection[0].NewDeaths / selection[0].TotalDeaths >
                rates.GlobalDeathRate
                  ? "filter-red"
                  : "filter-green"
              }
            />

            <CountrySelector
              defaultCountry={selection[0].CountryCode}
              order="0"
              handleChange={handleChange}
            />
          </div>
          <div>
            <CountryMap
              code={selection[1].CountryCode}
              filter={
                selection[1].NewDeaths / selection[1].TotalDeaths >
                rates.GlobalDeathRate
                  ? "filter-red"
                  : "filter-green"
              }
            />
            <CountrySelector
              defaultCountry={selection[1].CountryCode}
              order="1"
              handleChange={handleChange}
            />
          </div>
        </div>
        <table>
          <tr>
            <td>{selection[0].NewConfirmed}</td>
            <td>
              {arrowHandler(
                selection[0].NewConfirmed,
                selection[1].NewConfirmed,
                rates.GlobalCaseRate
              )}
            </td>
            <td>
              New Cases
              <div className="data-exp">{data.NewConfirmed}</div>
            </td>
            <td>
              {arrowHandler(
                selection[1].NewConfirmed,
                selection[0].NewConfirmed,
                rates.GlobalCaseRate
              )}
            </td>
            <td>{selection[1].NewConfirmed}</td>
          </tr>
          <tr>
            <td>{selection[0].TotalConfirmed}</td>
            <td>
              {arrowHandler(
                selection[0].TotalConfirmed,
                selection[1].TotalConfirmed,
                rates.GlobalCaseRate
              )}
            </td>
            <td>
              Total Cases
              <div className="data-exp">{data.TotalConfirmed}</div>
            </td>
            <td>
              {arrowHandler(
                selection[1].TotalConfirmed,
                selection[0].TotalConfirmed,
                rates.GlobalCaseRate
              )}
            </td>
            <td>{selection[1].TotalConfirmed}</td>
          </tr>
          <tr>
            <td>{selection[0].NewDeaths}</td>
            <td>
              {arrowHandler(
                selection[0].NewDeaths,
                selection[1].NewDeaths,
                rates.GlobalDeathRate
              )}
            </td>
            <td>
              New Deaths
              <div className="data-exp">{data.NewDeaths}</div>
            </td>
            <td>
              {arrowHandler(
                selection[1].NewDeaths,
                selection[0].NewDeaths,
                rates.GlobalDeathRate
              )}
            </td>
            <td>{selection[1].NewDeaths}</td>
          </tr>
          <tr>
            <td>{selection[0].TotalDeaths}</td>
            <td>
              {arrowHandler(
                selection[0].TotalDeaths,
                selection[1].TotalDeaths,
                rates.GlobalDeathRate
              )}
            </td>
            <td>
              Total Deaths
              <div className="data-exp">{data.TotalDeaths}</div>
            </td>
            <td>
              {arrowHandler(
                selection[1].TotalDeaths,
                selection[0].TotalDeaths,
                rates.GlobalDeathRate
              )}
            </td>
            <td>{selection[1].TotalDeaths}</td>
          </tr>
          <tr>
            <td>{selection[0].NewRecovered}</td>
            <td>
              {arrowHandler(
                selection[0].NewRecovered,
                selection[1].NewRecovered,
                rates.GlobalRecoveryRate
              )}
            </td>
            <td>
              New Recovery
              <div className="data-exp">{data.NewRecovered}</div>
            </td>
            <td>
              {arrowHandler(
                selection[1].NewRecovered,
                selection[0].NewRecovered,
                rates.GlobalRecoveryRate
              )}
            </td>
            <td>{selection[1].NewRecovered}</td>
          </tr>
          <tr>
            <td>{selection[0].TotalRecovered}</td>
            <td>
              {arrowHandler(
                selection[0].TotalRecovered,
                selection[1].TotalRecovered,
                rates.GlobalRecoveryRate
              )}
            </td>
            <td>
              Total Recovery
              <div className="data-exp">{data.TotalRecovered}</div>
            </td>
            <td>
              {arrowHandler(
                selection[1].TotalRecovered,
                selection[0].TotalRecovered,
                rates.GlobalRecoveryRate
              )}
            </td>
            <td>{selection[1].TotalRecovered}</td>
          </tr>
        </table>
      </div>
    </div>
  );
}
