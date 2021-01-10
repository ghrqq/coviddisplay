import React, { useContext, useState, useEffect } from "react";
import { CountryContext, GlobalRate, CompareContext } from "../App";
import CountrySelector from "./CountrySelector";
import img from "./img/az/vector.svg";
import preloader from "./preloader.gif";
import { countryNamer } from "../tools/CountryNamer";
import CountryDataTable from "./CountryDataTable";

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

  const handleChange = (val) => {
    setselected(val);
  };

  useEffect(() => {
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
    const mapPath = require("./img/" + selected.toLowerCase() + "/vector.svg")
      ? require("./img/" + selected.toLowerCase() + "/vector.svg")
      : require("./404.png");

    if (!mapPath) {
      const notFound = require("./404.png");
      setcountryMap(notFound);
    }
    setcountryMap(mapPath.default);
  }, [selected]);

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
            {" "}
            Remove{" "}
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
      </div>
    </div>
  );
}
