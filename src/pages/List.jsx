import React, { useState, useContext, useEffect } from "react";
import { CountryContext, CompareContext } from "../App";
import ScreenSizeChecker from "../components/ScreenSizeChecker";

import sort from "./sort.png";
import sortUp from "./sort-up.png";
import sortDown from "./sort-down.png";

export default function List() {
  const [countries] = useContext(CountryContext);
  const [compareHandler, removeFromCompare] = useContext(CompareContext);
  const [list, setlist] = useState([]);
  const [keys, setkeys] = useState([]);
  const [sortBy, setsortBy] = useState("");
  const [isAsc, setisAsc] = useState("");
  const [wobble, setwobble] = useState(0);
  const [compare, setcompare] = useState("");

  useEffect(() => {
    if (countries.length > 0) {
      setlist(countries);
      let iterationKeys = Object.keys(countries[0]).slice(1, -1);

      let noSlug = iterationKeys.filter(
        (key) => key !== "Slug" && key !== "Date" && key !== "CountryCode"
      );

      setkeys(noSlug);
    }
  }, [countries]);

  const handleSort = (e) => {
    setsortBy(e.target.value);
    if (isAsc === "") {
      setisAsc(true);
    }
    setisAsc(!isAsc);
  };

  const compareProvider = (i) => {
    return (
      <td>
        {compare === i ? (
          <div
            className="compare-button red"
            style={{ fontSize: "12px" }}
            onClick={() => removeClickHandler(i)}
            onAnimationEnd={() => setwobble(0)}
            wobble={wobble}
          >
            {" "}
            Remove{" "}
          </div>
        ) : (
          <div
            className="compare-button"
            style={{ fontSize: "12px" }}
            onClick={() => compareClickHandler(i)}
            onAnimationEnd={() => setwobble(0)}
            wobble={wobble}
          >
            Add to Compare
          </div>
        )}
      </td>
    );
  };

  const sortProvider = (val, sorter) => {
    if (val === "") {
      return list.map((item) => (
        <tr>
          {keys.map((key) => (
            <td>{item[key]}</td>
          ))}

          {compareProvider(item.CountryCode)}
        </tr>
      ));
    }
    if (val === "Country" || val === "CountryCode") {
      if (isAsc === true) {
        return list
          .sort((a, b) => a[sortBy].localeCompare(b[sortBy]))
          .map((item) => (
            <tr>
              {keys.map((key) => (
                <td>{item[key]}</td>
              ))}

              {compareProvider(item.CountryCode)}
            </tr>
          ));
      } else {
        return list
          .sort((a, b) => b[sortBy].localeCompare(a[sortBy]))
          .map((item) => (
            <tr>
              {keys.map((key) => (
                <td>{item[key]}</td>
              ))}

              {compareProvider(item.CountryCode)}
            </tr>
          ));
      }
    }

    if (sorter === true) {
      return list
        .sort((a, b) => b[sortBy] - a[sortBy])
        .map((item) => (
          <tr>
            {keys.map((key) => (
              <td>{item[key]}</td>
            ))}

            {compareProvider(item.CountryCode)}
          </tr>
        ));
    }

    if (sorter === false) {
      return list
        .sort((a, b) => a[sortBy] - b[sortBy])
        .map((item) => (
          <tr>
            {keys.map((key) => (
              <td>{item[key]}</td>
            ))}

            {compareProvider(item.CountryCode)}
          </tr>
        ));
    }
  };

  const compareClickHandler = (i) => {
    setwobble(1);
    compareHandler(i);
    setcompare(i);
  };

  const removeClickHandler = (i) => {
    setwobble(1);
    removeFromCompare(i);
    setcompare("");
  };

  if (countries.length < 1 || keys.length < 1) return <h2>Loading...</h2>;

  return (
    <div className="list">
      <ScreenSizeChecker />
      <table className="max">
        <tbody>
          <tr>
            {keys.map((key) => (
              <th>
                <button
                  className="button-sort"
                  value={key}
                  onClick={(e) => handleSort(e)}
                >
                  {key}{" "}
                  {key !== sortBy ? (
                    <img alt="sort" className="sort-icon" src={sort} />
                  ) : isAsc ? (
                    <img alt="sort-down" className="sort-icon" src={sortDown} />
                  ) : (
                    <img alt="sort-up" className="sort-icon" src={sortUp} />
                  )}
                </button>
              </th>
            ))}
            <th> </th>
          </tr>

          {sortProvider(sortBy, isAsc)}
        </tbody>
      </table>
    </div>
  );
}
