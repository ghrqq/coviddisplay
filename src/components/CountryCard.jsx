import React, { useContext, useState, useEffect } from "react";
import { CountryContext, GlobalRate } from "../App";
import CountrySelector from "./CountrySelector";
import img from "./img/az/vector.svg";
import preloader from "./preloader.gif";
import { countryNamer } from "../tools/CountryNamer";

export default function CountryCard({ country }) {
  const [selected, setselected] = useState(country);
  const [countries] = useContext(CountryContext);
  const [rates] = useContext(GlobalRate);
  const [data, setdata] = useState("");
  const [countryMap, setcountryMap] = useState(preloader);
  const [filter, setfilter] = useState("filter-green");

  const handleChange = (val) => {
    setselected(val);
  };

  useEffect(() => {
    console.log("useeffect on selected fired.", selected);
    if (selected === " ") {
      const random = countries[Math.floor(Math.random() * 100)];
      setdata(random);
    }
    const choice = countries.filter((item) => item.CountryCode === selected);
    console.log("choice on selected: ", choice);
    setdata(choice);
    if (choice.length > 0) {
      if (choice[0].NewDeaths / choice[0].TotalDeaths > rates.GlobalDeathRate) {
        setfilter("filter-red");
      } else {
        setfilter("filter-green");
      }
    }
  }, [selected]);

  useEffect(() => {
    console.log("useeffect on refresh fired.", selected);
    if (selected === " ") {
      const random = countries[Math.floor(Math.random() * 100)];
      setdata(random);
    }

    const choice = countries.filter((item) => item.CountryCode === selected);
    console.log("choice on refresh: ", choice);
    setdata(choice);
    if (choice.length > 0) {
      if (choice[0].NewDeaths / choice[0].TotalDeaths > rates.GlobalDeathRate) {
        setfilter("filter-red");
      } else {
        setfilter("filter-green");
      }
    }
  }, [countries]);

  useEffect(() => {
    // const lower = countryNamer(selected, "iso2");

    // console.log("lower: ", lower[0].toLowerCase());
    const mapPath = require("./img/" + selected.toLowerCase() + "/vector.svg");
    setcountryMap(mapPath.default);
  }, [selected]);

  return (
    <div className="country-card">
      <div className="country-image">
        <img src={countryMap} className={filter} />
      </div>
      <div className="country-name">
        <CountrySelector
          defaultCountry={selected}
          handleChange={handleChange}
        />{" "}
        {/* TODO props and change handler will be added */}
      </div>
      <div className="country-data">
        <table>
          <tr>
            <td>
              <div className="data-exp">New Cases</div>
              <div className="data-num">18191</div>
            </td>
            <td>
              <div className="data-exp">New Cases</div>
              <div className="data-num">18191</div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="data-exp">New Cases</div>
              <div className="data-num">18191</div>
            </td>
            <td>
              <div className="data-exp">New Cases</div>
              <div className="data-num">18191</div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="data-exp">New Cases</div>
              <div className="data-num">18191</div>
            </td>
            <td>
              <div className="data-exp">New Cases</div>
              <div className="data-num">18191</div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="data-exp">New Cases</div>
              <div className="data-num">18191</div>
            </td>
            <td>
              <div className="data-exp">New Cases</div>
              <div className="data-num">18191</div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}
