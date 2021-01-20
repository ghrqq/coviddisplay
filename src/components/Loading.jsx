import preloader from "./preloader.gif";
import React from "react";

export default function Loading() {
  return (
    <div style={{ width: "320px", margin: "0 auto" }}>
      <img src={preloader} alt="Loader" />
    </div>
  );
}
