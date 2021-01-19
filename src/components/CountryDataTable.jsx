import React from "react";

export default function CountryDataTable(props) {
  if (!props.country) return <div>Data Loading ... </div>;
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <div className="data-exp">New Cases</div>
              <div className="data-num">{props.country[0].NewConfirmed}</div>
            </td>
            <td>
              <div className="data-exp">Total Cases</div>
              <div className="data-num">{props.country[0].TotalConfirmed}</div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="data-exp">New Deaths</div>
              <div className="data-num">{props.country[0].NewDeaths}</div>
            </td>
            <td>
              <div className="data-exp">Total Deaths</div>
              <div className="data-num">{props.country[0].TotalDeaths} </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="data-exp">New Recovered</div>
              <div className="data-num">{props.country[0].NewRecovered} </div>
            </td>
            <td>
              <div className="data-exp">Total Recovered</div>
              <div className="data-num">{props.country[0].TotalRecovered} </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
