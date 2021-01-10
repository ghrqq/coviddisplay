import React from "react";

export default function CountryCardFooter({ data, handleDisplay }) {
  if (!data) return <div>Data Loading...</div>;

  return (
    <div>
      <h2 onClick={handleDisplay()}>Show Details</h2>

      <table>
        <tr>
          <td></td>
          <td>
            <div className="data-exp">Population</div>
            <div className="data-num">
              {data[0].Premium.CountryStats.Population}
            </div>
          </td>
          <td></td>
        </tr>
        <tr>
          <td>
            <div className="data-exp rate-item">Covid Death Rate</div>
            21%
          </td>
          <td>
            <div className="data-exp rate-item">Covid Recovery Rate</div>
            13%
          </td>
          <td>
            <div className="data-exp rate-item">Covid Avg. Case Rate</div>
            5%
          </td>
        </tr>
        <tr>
          <td>
            <div className="data-exp">GDP Per Capita</div>
            {data[0].Premium.CountryStats.GdpPerCapita}{" "}
          </td>
          <td>
            <div className="data-exp">Life Expectancy</div>
            {data[0].Premium.CountryStats.LifeExpectancy}{" "}
          </td>
          <td>
            <div className="data-exp">Avg. Age</div>
            {data[0].Premium.CountryStats.MedianAge}{" "}
          </td>
        </tr>
      </table>
    </div>
  );
}
