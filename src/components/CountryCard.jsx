import React, { useContext, useState, useEffect } from "react";
import { CountryContext, GlobalRate, CompareContext } from "../App";
import CountrySelector from "./CountrySelector";

import CountryDataTable from "./CountryDataTable";
import CountryMap from "./CountryMap";

export default function CountryCard({ country }) {
  const [selected, setselected] = useState(country);
  const [countries] = useContext(CountryContext);
  const [rates] = useContext(GlobalRate);
  const [compareHandler, removeFromCompare] = useContext(CompareContext);
  const [data, setdata] = useState("");

  const [filter, setfilter] = useState("filter-green");
  const [wobble, setwobble] = useState(0);
  const [isAddedToCompare, setisAddedToCompare] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setselected(e.target.value);
  };

  // useEffect(() => {
  //   if (selected === " ") {
  //     const random = countries[Math.floor(Math.random() * 100)];
  //     setdata(random);
  //   }

  //   const choice = countries.filter((item) => item.CountryCode === selected);

  //   setdata(choice);
  //   if (choice.length > 0) {
  //     if (choice[0].NewDeaths / choice[0].TotalDeaths > rates.GlobalDeathRate) {
  //       setfilter("filter-red");
  //     } else {
  //       setfilter("filter-green");
  //     }
  //   }
  // }, [countries, selected, rates.GlobalDeathRate]);

  const filterProvider = () => {
    const data = countries.filter((item) => item.CountryCode === selected);
    if (data[0].NewDeaths / data[0].TotalDeaths > rates.GlobalDeathRate) {
      return "filter-red";
    } else {
      return "filter-green";
    }
  };

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
      {/* <CountryMap code={selected} filter={filterProvider()} />
      <div className="country-name">
        <CountrySelector
          defaultCountry={selected}
          handleChange={handleChange}
        />
      </div> */}
      <h2>{selected}</h2>

      {/* <div className="country-data">
        <CountryDataTable
          country={countries.filter((item) => item.CountryCode === selected)}
        />
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
