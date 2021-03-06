import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import { Router, navigate } from "@reach/router";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Navigation from "./pages/Navigation";
import Home from "./pages/Home";
import Compare from "./components/Compare";

import Footer from "./components/Footer";
import List from "./pages/List";
import Loading from "./components/Loading";

export const CountryContext = React.createContext([]);
export const InitialCountryContext = React.createContext([]);
export const GlobalRate = React.createContext([]);
export const CompareContext = React.createContext([]);
export const GlobalData = React.createContext([]);

function App() {
  // Data loading indicators
  const [loading, setloading] = useState(true);

  // Data states
  const [isCompare, setisCompare] = useState(false);
  // Const Global

  const [globalRates, setglobalRates] = useState({});
  const [globalData, setglobalData] = useState({});
  const [countries, setcountries] = useState([]);
  const [apiMessage, setapiMessage] = useState("");

  // Compare Ref

  const compRef = useRef([]);

  // const compareNavigator = (country) => {
  //   if (compRef.current.length < 2) {
  //     compRef.current = [...compRef.current, country];
  //   }
  //   if (compRef.current.length === 2) {
  //     navigate(`/compare/${compRef.current[0]}/${compRef.current[1]}`);
  //     window.scrollTo(0, 0);
  //     compRef.current = [];
  //   }
  // };
  const compareNavigator = (country) => {
    if (compRef.current.length < 2) {
      compRef.current = [...compRef.current, country];
    }
    if (compRef.current.length === 2) {
      setisCompare(true);
      window.scrollTo(0, 0);
      // compRef.current = [];
    }
  };

  const removeFromCompare = (country) => {
    compRef.current = [];
  };

  useEffect(() => {
    setloading(true);

    async function getData() {
      const config = {
        method: "get",
        url: "https://api.covid19api.com/summary",
      };

      const res = await axios(config);

      if (res) {
        setglobalData(res.data.Global);
        let rates = {
          GlobalDeathRate:
            res.data.Global.NewDeaths / res.data.Global.TotalDeaths,
          GlobalCaseRate:
            res.data.Global.NewConfirmed / res.data.Global.TotalConfirmed,
          GlobalRecoveryRate:
            res.data.Global.NewRecovered / res.data.Global.TotalRecovered,
        };

        setglobalRates(rates);

        setcountries(res.data.Countries);

        setapiMessage(res.data.Message);
        setloading(false);
      } else {
        return;
      }
    }
    getData();
  }, []);

  const handleCompareClose = () => {
    compRef.current = [];
    setisCompare(false);
  };

  if (apiMessage !== "")
    return (
      <h2>
        Server is currently processing new data. Please try again in 5 minutes.
      </h2>
    );

  if (loading) return <Loading />;
  return (
    <>
      <CountryContext.Provider value={[countries, setcountries]}>
        <GlobalRate.Provider value={[globalRates, setglobalRates]}>
          <CompareContext.Provider
            value={[compareNavigator, removeFromCompare]}
          >
            <GlobalData.Provider value={[globalData, setglobalData]}>
              <div className="app">
                <Navigation handleClose={handleCompareClose} />
                {isCompare ? (
                  <Compare
                    country={compRef.current[0]}
                    country2={compRef.current[1]}
                    handleClose={handleCompareClose}
                  />
                ) : (
                  <Router id="router">
                    <Home path="/" default />

                    <About path="/about" />
                    <Contact path="/contact" />
                    <List path="/list" />
                  </Router>
                )}

                <Footer handleClose={handleCompareClose} />
              </div>
            </GlobalData.Provider>
          </CompareContext.Provider>
        </GlobalRate.Provider>
      </CountryContext.Provider>
    </>
  );
}

export default App;
