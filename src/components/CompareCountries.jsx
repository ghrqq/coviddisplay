import React from "react";

export default function CompareCountries(props) {
  return (
    <div>
      {JSON.stringify(props.countryArr)} &&& {JSON.stringify(props.global)}
      <table>
        <tr></tr>
      </table>
    </div>
  );
}
