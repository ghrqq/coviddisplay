import "./App.css";
import React, { useState, useEffect } from "react";
import { Placeholder } from "semantic-ui-react";
import { Router, navigate } from "@reach/router";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Navigation from "./pages/Navigation";
import SingleCountryDisplayer from "./components/SingleCountryDisplayer";
import GlobalDisplay from "./components/GlobalDisplay";
import { countryNamer } from "./tools/CountryNamer";

export const CountryContext = React.createContext([]);

function App() {
  const [lang, setlang] = useState({});
  const [loading, setloading] = useState(true);
  const [callChilds, setcallChilds] = useState(false);
  const [details, setdetails] = useState({});
  const [selectedCountry, setselectedCountry] = useState("");
  const [relatedCountry, setrelatedCountry] = useState("");
  const [globalData, setglobalData] = useState({});
  const [countries, setcountries] = useState([]);
  const [apiMessage, setapiMessage] = useState("");
  const [relatedData, setrelatedData] = useState({});

  const language = window.navigator.userLanguage || window.navigator.language;
  const getUserGeolocationDetailss = () => {
    fetch(
      "https://geolocation-db.com/json/09ba3820-0f88-11eb-9ba6-e1dd7dece2b8"
    )
      .then((response) => response.json())
      .then((data) => setdetails(data));
    setselectedCountry(details.country_name);
  };

  const languageSetter = async () => {
    const langu = window.navigator.userLanguage || window.navigator.language;
    const languageName =
      (await langu.length) > 2
        ? countryNamer(langu.split(3, 5).toUpperCase(), "name")
        : countryNamer(langu.toUpperCase(), "name");

    setlang({ ab: langu, name: languageName[0] });
    setrelatedCountry(languageName[0]);
  };

  useEffect(() => {
    async function getUserGeolocationDetails() {
      const result = await (
        await fetch(
          "https://geolocation-db.com/json/09ba3820-0f88-11eb-9ba6-e1dd7dece2b8"
        )
      ).json();

      setdetails(result);
      setselectedCountry(result.country_name);
      setcallChilds(true);
      // const slctdData = countryPicker(selectedCountry);
      // setselectedData(slctdData);
      // const rltdData = countryPicker(relatedCountry);
      // setrelatedData(rltdData);
    }

    getUserGeolocationDetails();
    languageSetter();
  }, []);

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
      <div className="app">
        <Navigation />
        <Router id="router">
          <About path="about" />
          <Contact path="contact" />
        </Router>

        {!loading ? (
          <GlobalDisplay sum={globalData} />
        ) : (
          <Placeholder>
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder>
        )}

        {countries !== [] || countries !== undefined ? (
          <div className="container-top">
            <div className="container">
              <select onChange={(e) => setselectedCountry(e.target.value)}>
                <option value={selectedCountry}>
                  Please choose a country.
                </option>
                {countries.map((country) => (
                  <option value={country.Country}>{country.Country}</option>
                ))}
              </select>
              <SingleCountryDisplayer val={selectedCountry} />
            </div>
            <div className="container">
              <select onChange={(e) => setrelatedCountry(e.target.value)}>
                <option value={relatedCountry}>Please choose a country.</option>
                {countries.map((country) => (
                  <option value={country.Country}>{country.Country}</option>
                ))}
              </select>
              <SingleCountryDisplayer val={relatedCountry} />
            </div>
          </div>
        ) : (
          <Placeholder>
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder>
        )}
      </div>
    </CountryContext.Provider>
  );
}

export default App;
