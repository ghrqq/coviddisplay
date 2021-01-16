import React, { useState, useEffect } from "react";
import preloader from "./preloader.gif";

export default function CountryMap({ code, filter }) {
  // const [filter, setfilter] = useState("filter-green");
  const [countryMap, setcountryMap] = useState(preloader);

  useEffect(() => {
    if (code === undefined) return;
    const mapPath = require("./img/" + code.toLowerCase() + "/vector.svg")
      ? require("./img/" + code.toLowerCase() + "/vector.svg")
      : require("./404.png");

    if (!mapPath) {
      const notFound = require("./404.png");
      setcountryMap(notFound);
    }
    setcountryMap(mapPath.default);
  }, [code, filter]);

  return (
    <div className="country-image">
      <img src={countryMap} className={filter} />
    </div>
  );
}
