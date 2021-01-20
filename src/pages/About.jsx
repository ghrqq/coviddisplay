import React from "react";
import Contact from "./Contact";

const About = () => {
  return (
    <div className="about">
      <p>This app has been created for fun.</p>
      <p>
        Data may be outdated or wrong. For further information please visit the{" "}
        <a href="https://covid19api.com/" target="_black" rel="noreferrer">
          {" "}
          data source.
        </a>{" "}
      </p>
      <p>
        If you have any reason to get in touch, please feel free to reach me via
        the channels below.
      </p>
      <Contact />
    </div>
  );
};

export default About;
