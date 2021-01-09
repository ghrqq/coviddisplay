import "./App.css";
import React, { useState, useEffect } from "react";

import { Router, navigate } from "@reach/router";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Navigation from "./pages/Navigation";
import Home from "./pages/Home";

export const CountryContext = React.createContext([]);
export const InitialCountryContext = React.createContext([]);
export const GlobalRate = React.createContext([]);

function App() {
  const [lang, setlang] = useState({});

  // Data loading indicators
  const [loading, setloading] = useState(false);
  const [isRelatedLoading, setisRelatedLoading] = useState(false);
  const [isSelectedLoading, setisSelectedLoading] = useState(false);

  // Data states
  const [details, setdetails] = useState({});
  const [selectedCountry, setselectedCountry] = useState("");
  const [relatedCountry, setrelatedCountry] = useState("");

  // Const Global

  const [globalRates, setglobalRates] = useState({});
  const [globalData, setglobalData] = useState({});
  const [countries, setcountries] = useState([]);
  const [apiMessage, setapiMessage] = useState("");

  const language = window.navigator.userLanguage || window.navigator.language;
  // const getUserGeolocationDetailss = () => {
  //   setisSelectedLoading(true);
  //   fetch(
  //     "https://geolocation-db.com/json/09ba3820-0f88-11eb-9ba6-e1dd7dece2b8"
  //   )
  //     .then((response) => response.json())
  //     .then((data) => setdetails(data));
  //   setselectedCountry(details.country_name);

  //   setisSelectedLoading(false);
  // };

  useEffect(() => {
    setloading(true);
    async function getData() {
      const result = await (
        await fetch("https://api.covid19api.com/summary", {
          method: "GET",
          headers: {
            "X-Access-Token": "5cf9dfd5-3449-485e-b5ae-70a60e997864",
          },
        })
      ).json();
      setglobalData(result.Global);
      let rates = {
        GlobalDeathRate: result.Global.NewDeaths / result.Global.TotalDeaths,
        GlobalCaseRate:
          result.Global.NewConfirmed / result.Global.TotalConfirmed,
        GlobalRecoveryRate:
          result.Global.NewRecovered / result.Global.TotalRecovered,
      };
      setglobalRates(rates);
      setcountries(result.Countries);
      setapiMessage(result.Message);
      setloading(false);
    }
    getData();
  }, []);
  if (apiMessage !== "")
    return (
      <h2>
        Server is currently processing new data. Please try again in 5 minutes.
      </h2>
    );
  return (
    <CountryContext.Provider value={[countries, setcountries]}>
      <GlobalRate.Provider value={[globalRates, setglobalRates]}>
        <div className="app">
          <Navigation />
          <Router id="router">
            <Home path="/" />

            <About path="about" />
            <Contact path="contact" />
          </Router>
        </div>
      </GlobalRate.Provider>
    </CountryContext.Provider>
  );
}

export default App;
