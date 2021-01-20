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
  const [lang, setlang] = useState("");
  const [initial, setinitial] = useState([]);

  const [details, setdetails] = useState({});

  // const languageSetter = async () => {
  //   setisRelatedLoading(true);

  //   setrelatedCountry(languageName[0]);
  //   setinitial([...initial, languageName[0]]);

  //   setisRelatedLoading(false);
  // };

  // useEffect(() => {
  //   async function getUserGeolocationDetails() {
  //     setisSelectedLoading(true);
  //     let tempArr = [];
  //     const langu =
  //       window.navigator.userLanguage || window.navigator.language || "US";

  //     const languageName =
  //       langu.length > 0
  //         ? countryNamer(langu.slice(3, 5).toUpperCase(), "name")
  //         : countryNamer(langu.toUpperCase(), "name");

  //     setlang({ ab: langu, name: languageName[0] });

  //     tempArr.push(langu.slice(3, 5).toUpperCase());

  //     setinitial(tempArr);

  //     const result = await (
  //       await fetch(
  //         "https://geolocation-db.com/json/09ba3820-0f88-11eb-9ba6-e1dd7dece2b8"
  //       )
  //     ).json();
  //     if (result) {
  //       setdetails(result);

  //       tempArr.push(result.country_code);
  //       setinitial(tempArr);
  //       setisSelectedLoading(false);
  //     } else {
  //       tempArr.push("DE");
  //       setinitial(tempArr);

  //       setisSelectedLoading(false);
  //     }
  //   }

  //   getUserGeolocationDetails();
  // }, []);

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
    // <>
    //   <div className="home">
    //     <GlobalData />
    //   </div>

    //     {initial.length <= availableSpace ? (
    //       <div className="wrapper country-adder">
    //         <div
    //           className="country-card"
    //           onClick={() =>
    //             setinitial([
    //               ...initial,
    //               countries[Math.floor(Math.random() * 100)]["CountryCode"],
    //             ])
    //           }
    //         >
    //           <div className="country-adder-text">Add...</div>
    //         </div>
    //       </div>
    //     ) : null}
    //   </div>
    // </>
    <>
      <div className="home">
        <GlobalDataDisplayer />
      </div>
      {/* {initial ? <MainMiddle countries={initial} /> : <h4>init</h4>} */}
      <div className="country-card-container">
        {/* {initial.length > 0 ? (
          initial.map((item) => {
            {
              console.log("map fired", item);
            }
            <div className="wrapper">
              <CountryCard key={initial.indexOf(item)} country={item} />
            </div>;
          })
        ) : (
          <div>Loading...</div>
        )} */}
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
