import React from "react";
import CountryCard from "./CountryCard";

export default function MainMiddle(props) {
  return (
    <div>
      {props.countries.map((item) => {
        <CountryCard key={item} country={item} />;
      })}
    </div>
  );
}
