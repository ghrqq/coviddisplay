const countryJSON = require("./CountryNames.json");

// val input to be changed || STRING || any
// selector desired output || STRING || "iso2", "iso3", "name"

export const countryNamer = (val, selector) => {
  if (val.length === 2) {
    return countryJSON
      .filter((country) => country["iso2"] === val)
      .map((country) => country[selector]);
  }
  if (val.length === 3) {
    return countryJSON
      .filter((country) => country["iso3"] === val)
      .map((country) => country[selector]);
  }
  if (val.length > 3) {
    return countryJSON
      .filter((country) => country["name"] === val)
      .map((country) => country[selector]);
  } else {
    return "Error";
  }
};
