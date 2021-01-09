import React, { useState, useContext, useCallback, useEffect } from "react";
import { CountryContext } from "../App";
import CountryCard from "../components/CountryCard";
import GlobalData from "../components/GlobalData";
import useWindowDimensions from "../tools/useWindowDimensions";
import { countryNamer } from "../tools/CountryNamer";

export default function Home(props) {
  //Get dimensions for country adder
  const [countries] = useContext(CountryContext);
  const { width } = useWindowDimensions();

  //Maximum renderable country (on a single line).
  const [availableSpace, setAvailableSpace] = useState(Math.floor(width / 330));

  const [count, setCount] = useState(2);

  const [isSelectedLoading, setisSelectedLoading] = useState("");
  const [lang, setlang] = useState("");
  const [initial, setinitial] = useState([]);

  const [details, setdetails] = useState({});

  // const languageSetter = async () => {
  //   setisRelatedLoading(true);

  //   setrelatedCountry(languageName[0]);
  //   setinitial([...initial, languageName[0]]);

  //   setisRelatedLoading(false);
  // };

  useEffect(() => {
    setisSelectedLoading(true);
    async function getUserGeolocationDetails() {
      let tempArr = [];

      const result = await (
        await fetch(
          "https://geolocation-db.com/json/09ba3820-0f88-11eb-9ba6-e1dd7dece2b8"
        )
      ).json();
      setdetails(result);

      tempArr.push(result.country_code);

      const langu = window.navigator.userLanguage || window.navigator.language;
      console.log("langguuuu: ", langu);
      const languageName =
        (await langu.length) > 2
          ? countryNamer(langu.split(3, 5).toUpperCase(), "name")
          : countryNamer(langu.toUpperCase(), "name");

      setlang({ ab: langu, name: languageName[0] });

      tempArr.push(langu.toUpperCase());
      console.log(tempArr);

      setinitial(tempArr);
      setisSelectedLoading(false);
    }

    getUserGeolocationDetails();
  }, []);

  return (
    <>
      <div className="home">
        <GlobalData />
      </div>

      <div className="country-card-container">
        {isSelectedLoading === false ? (
          initial.map((item) => {
            return (
              <div className="wrapper">
                <CountryCard key={initial.indexOf(item)} country={item} />
              </div>
            );
          })
        ) : (
          <div>Loading...</div>
        )}
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
