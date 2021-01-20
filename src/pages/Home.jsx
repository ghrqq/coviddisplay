import React, { useState, useContext, useEffect } from "react";
import { CountryContext } from "../App";
import CountryCard from "../components/CountryCard";
import GlobalDataDisplayer from "../components/GlobalDataDisplayer";
import useWindowDimensions from "../tools/useWindowDimensions";
import MainMiddle from "../components/MainMiddle";
import { countryNamer } from "../tools/CountryNamer";
import Loading from "../components/Loading";
// import axios from "axios";

export default function Home(props) {
  //Get dimensions for country adder
  const [countries] = useContext(CountryContext);
  const { width } = useWindowDimensions();

  //Maximum renderable country (on a single line).
  const [availableSpace, setAvailableSpace] = useState(Math.floor(width / 330));

  const [isSelectedLoading, setisSelectedLoading] = useState("");

  const [initial, setinitial] = useState([]);

  useEffect(() => {
    setisSelectedLoading(true);
    if (!countries) {
      return;
    }
    let tempArr = [];

    let lang =
      window.navigator.userLanguage || window.navigator.language || "US";
    if (lang) {
      tempArr.push(lang.slice(3, 5).toUpperCase());
    }

    tempArr.push(countries[Math.floor(Math.random() * 100)]["CountryCode"]);

    setinitial(tempArr);
    setisSelectedLoading(false);
    return () => {};
  }, [countries]);

  if (isSelectedLoading) return <Loading />;
  return (
    <>
      <div className="home">
        <GlobalDataDisplayer />
      </div>

      <div className="country-card-container">
        {initial.map((item) => (
          <div className="wrapper">
            <CountryCard key={item} country={item} />
          </div>
        ))}

        {initial.length <= availableSpace ? (
          <div className="wrapper country-adder">
            <div
              className="country-card"
              onClick={() =>
                setinitial([
                  ...initial,
                  countries[Math.floor(Math.random() * 100)]["CountryCode"],
                ])
              }
            >
              <div className="country-adder-text">Add...</div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
