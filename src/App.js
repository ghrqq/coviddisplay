import "./App.css";
import React, { useState, useEffect, useRef } from "react";

import { Router, navigate } from "@reach/router";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Navigation from "./pages/Navigation";
import Home from "./pages/Home";
import Compare from "./pages/Compare";
import Footer from "./components/Footer";
import List from "./pages/List";

export const CountryContext = React.createContext([]);
export const InitialCountryContext = React.createContext([]);
export const GlobalRate = React.createContext([]);
export const CompareContext = React.createContext([]);
export const GlobalData = React.createContext([]);

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

  // Compare State

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

  const compRef = useRef([]);

  const compareNavigator = (country) => {
    if (compRef.current.length < 2) {
      compRef.current = [...compRef.current, country];
    }
    if (compRef.current.length === 2) {
      navigate(`/compare/${compRef.current[0]}/${compRef.current[1]}`);
      window.scrollTo(0, 0);
      compRef.current = [];
    }
  };

  const removeFromCompare = (country) => {
    compRef.current = [];
  };

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
      window.alert(result.Global);
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
        <CompareContext.Provider value={[compareNavigator, removeFromCompare]}>
          <GlobalData.Provider value={[globalData, setglobalData]}>
            <div className="app">
              <Navigation />
              <Router id="router">
                <Home path="/" />
                <Compare path="/compare/:country/:country2" />
                <About path="about" />
                <Contact path="contact" />
                <List path="list" />
              </Router>
              <Footer />
            </div>
          </GlobalData.Provider>
        </CompareContext.Provider>
      </GlobalRate.Provider>
    </CountryContext.Provider>
  );
}

export default App;
