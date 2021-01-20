import React, { useContext } from "react";
import { GlobalData } from "../App";

export default function GlobalDataDisplayer() {
  const [globalData] = useContext(GlobalData);

  if (!globalData || globalData.length < 2) return <h2>Loading...</h2>;

  return (
    <div className="global-container">
      <div className="global-left">
        <div className="global-data-box">
          <div className="global-data-exp">New Cases</div>
          <div className="global-data-num">{globalData.NewConfirmed}</div>
        </div>
        <div className="global-data-box">
          <div className="global-data-exp">New Recovery</div>
          <div className="global-data-num"> {globalData.NewRecovered} </div>
        </div>
        <div className="global-data-box">
          <div className="global-data-exp">New Deaths</div>
          <div className="global-data-num">{globalData.NewDeaths}</div>
        </div>
      </div>
      <div className="global-right">
        <div className="global-data-box">
          <div className="global-data-exp">Total Cases</div>
          <div className="global-data-num">{globalData.TotalConfirmed}</div>
        </div>
        <div className="global-data-box">
          <div className="global-data-exp">Total Recovery</div>
          <div className="global-data-num">{globalData.TotalRecovered}</div>
        </div>
        <div className="global-data-box">
          <div className="global-data-exp">Total Deaths</div>
          <div className="global-data-num">{globalData.TotalDeaths}</div>
        </div>
      </div>
    </div>
  );
}
