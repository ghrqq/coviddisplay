import React, { useContext, useState, useEffect } from "react";
import { CountryContext, GlobalRate, CompareContext } from "../App";
import CountrySelector from "./CountrySelector";

import preloader from "./preloader.gif";

import CountryDataTable from "./CountryDataTable";
import CountryMap from "./CountryMap";

export default function CountryCard({ country }) {
  const [selected, setselected] = useState(country);
  const [countries] = useContext(CountryContext);
  const [rates] = useContext(GlobalRate);
  const [compareHandler, removeFromCompare] = useContext(CompareContext);
  const [data, setdata] = useState("");
  const [countryMap, setcountryMap] = useState(preloader);
  const [filter, setfilter] = useState("filter-green");
  const [wobble, setwobble] = useState(0);
  const [isAddedToCompare, setisAddedToCompare] = useState(false);

  const handleChange = (e) => {
    setselected(e.target.value);
  };

  useEffect(() => {
    if (selected === " ") {
      const random = countries[Math.floor(Math.random() * 100)];
      setdata(random);
    }
    const choice = countries.filter((item) => item.CountryCode === selected);

    setdata(choice);
    if (choice.length > 0) {
      if (choice[0].NewDeaths / choice[0].TotalDeaths > rates.GlobalDeathRate) {
        setfilter("filter-red");
      } else {
        setfilter("filter-green");
      }
    }
    const mapPath = require("./img/" + selected.toLowerCase() + "/vector.svg")
      ? require("./img/" + selected.toLowerCase() + "/vector.svg")
      : require("./404.png");

    if (!mapPath) {
      const notFound = require("./404.png");
      setcountryMap(notFound);
    }
    setcountryMap(mapPath.default);
  }, [selected]);

  useEffect(() => {
    if (selected === " ") {
      const random = countries[Math.floor(Math.random() * 100)];
      setdata(random);
    }

    const choice = countries.filter((item) => item.CountryCode === selected);

    setdata(choice);
    if (choice.length > 0) {
      if (choice[0].NewDeaths / choice[0].TotalDeaths > rates.GlobalDeathRate) {
        setfilter("filter-red");
      } else {
        setfilter("filter-green");
      }
    }
  }, [countries]);

  const compareClickHandler = () => {
    setwobble(1);
    compareHandler(selected);
    setisAddedToCompare(true);
  };

  const removeClickHandler = () => {
    setwobble(1);
    removeFromCompare(selected);
    setisAddedToCompare(false);
  };

  return (
    <div className="country-card">
      <h2>Working or not?</h2>

      {/* <CountryMap code={selected} filter={filter} />
      <div className="country-name">
        <CountrySelector
          defaultCountry={selected}
          handleChange={handleChange}
        />
      </div>
      <div className="country-data">
        {data.length > 0 ? <CountryDataTable country={data} /> : null}
      </div>
      <div className="country-card-footer">
        {isAddedToCompare ? (
          <div
            className="compare-button red"
            onClick={removeClickHandler}
            onAnimationEnd={() => setwobble(0)}
            wobble={wobble}
          >
            
            Remove
          </div>
        ) : (
          <div
            className="compare-button"
            onClick={compareClickHandler}
            onAnimationEnd={() => setwobble(0)}
            wobble={wobble}
          >
            Add to Compare
          </div>
        )}
      </div> */}
    </div>
  );
}
