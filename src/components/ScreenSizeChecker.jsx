import React from "react";
import useWindowDimensions from "../tools/useWindowDimensions";
import rotate from "./rotate.svg";
import resize from "./resize.svg";
import { isMobile } from "react-device-detect";

export default function ScreenSizeChecker() {
  const { width } = useWindowDimensions();
  return (
    <>
      {width < 568 && isMobile ? (
        <div className="screen-size-alert">
          <img src={rotate} />
          Please rotate your screen to display this page correctly.
        </div>
      ) : width < 568 ? (
        <div className="screen-size-alert">
          <img src={resize} />
          Please enlarge your screen to display this page correctly.
        </div>
      ) : null}
    </>
  );
}
