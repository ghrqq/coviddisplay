import React, { useState, useEffect } from "react";
import { Placeholder, Statistic } from "semantic-ui-react";

const GlobalDisplay = (props) => {
  useEffect(() => {}, [props]);

  return (
    <div>
      {props.sum === undefined ? (
        <Placeholder>
          <Placeholder.divne />
          <Placeholder.divne />
          <Placeholder.divne />
          <Placeholder.divne />
          <Placeholder.divne />
        </Placeholder>
      ) : (
        <div className="grid-container">
          <Statistic
            size="tiny"
            // className="data"
            style={{
              margin: "0.8em auto",
              padding: "0.8em auto",
              width: "100%",
            }}
          >
            <Statistic.Value>Global Data</Statistic.Value>
            <Statistic.Label>
              Last Update: {new Date().toISOString()}
            </Statistic.Label>
          </Statistic>
          <br />
          <Statistic
            size="mini"
            className="data"
            style={{ margin: "0.5em", padding: "0.5em" }}
          >
            <Statistic.Value>
              {props.sum.NewConfirmed.toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </Statistic.Value>
            <Statistic.Label>New Confirmed Cases</Statistic.Label>
            <Statistic.Value style={{ color: "red", marginTop: "10px" }}>
              {props.sum.TotalConfirmed.toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </Statistic.Value>
            <Statistic.Label style={{ color: "red" }}>
              Total Confirmed Cases
            </Statistic.Label>
            <Statistic.Value style={{ marginTop: "10px" }}>
              {(
                props.sum.NewConfirmed / props.sum.TotalConfirmed
              ).toLocaleString(undefined, {
                style: "percent",
                minimumFractionDigits: 4,
              })}
            </Statistic.Value>
            <Statistic.Label>Percentage of daily new cases</Statistic.Label>
          </Statistic>
          <Statistic
            size="mini"
            className="data"
            style={{ margin: "0.5em", padding: "0.5em" }}
          >
            <Statistic.Value>
              {props.sum.NewDeaths.toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </Statistic.Value>
            <Statistic.Label>New Deaths</Statistic.Label>
            <Statistic.Value style={{ color: "red", marginTop: "10px" }}>
              {props.sum.TotalDeaths.toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </Statistic.Value>
            <Statistic.Label style={{ color: "red" }}>
              Total Deaths
            </Statistic.Label>
            <Statistic.Value style={{ marginTop: "10px" }}>
              {(props.sum.NewDeaths / props.sum.TotalDeaths).toLocaleString(
                undefined,
                {
                  style: "percent",
                  minimumFractionDigits: 4,
                }
              )}
            </Statistic.Value>
            <Statistic.Label>Total Deaths</Statistic.Label>
          </Statistic>
          <Statistic
            size="mini"
            className="data"
            style={{ margin: "0.5em", padding: "0.5em" }}
          >
            <Statistic.Value>
              {props.sum.NewRecovered.toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </Statistic.Value>
            <Statistic.Label>New Recovered</Statistic.Label>
            <Statistic.Value style={{ color: "red", marginTop: "10px" }}>
              {props.sum.TotalRecovered.toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </Statistic.Value>
            <Statistic.Label style={{ color: "red" }}>
              Total Recovered
            </Statistic.Label>
            <Statistic.Value style={{ marginTop: "10px" }}>
              {(
                props.sum.NewRecovered / props.sum.TotalRecovered
              ).toLocaleString(undefined, {
                style: "percent",
                minimumFractionDigits: 4,
              })}
            </Statistic.Value>
            <Statistic.Label>Total Recovered</Statistic.Label>
          </Statistic>
        </div>
      )}
    </div>
  );
};

export default GlobalDisplay;
