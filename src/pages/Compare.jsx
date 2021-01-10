import React, { useState, useContext, useEffect } from "react";
import { CountryContext, GlobalRate } from "../App";
import CompareCountries from "../components/CompareCountries";

export default function Compare(props) {
  const [countries] = useContext(CountryContext);
  const [selection, setselection] = useState([]);
  const [rates] = useContext(GlobalRate);

  useEffect(() => {
    let tempArr = [];
    const firstToCompare = countries.filter(
      (item) => item.CountryCode === props.country
    );
    const secondToCompare = countries.filter(
      (item) => item.CountryCode === props.country2
    );
    tempArr = [...firstToCompare, ...secondToCompare];
    setselection(tempArr);
  }, [props]);

  return (
    <div>
      <CompareCountries countryArr={selection} global={rates} isDetail={true} />
    </div>
  );
}
