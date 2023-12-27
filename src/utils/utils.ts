//Display only year of production
const handleDate = (
  release_date: string,
  first_air_date: string,
  last_air_date: string,
) => {
  let result;

  if (release_date) {
    const splittedReleaseDate = release_date.split("-");

    result = splittedReleaseDate[0];
  } else if (!release_date && first_air_date && last_air_date) {
    const splittedFirstAirDate = first_air_date.split("-");
    const splittedLastAirDate = last_air_date.split("-");

    result = `${splittedFirstAirDate[0]} - ${splittedLastAirDate[0]}`;
  } else {
    return null;
  }

  return result;
};

//Display runtime in correct format.
//If it's under 60mins, show only mins, otherwise calculate hours and show both
const handleRuntimeFormat = (runtime: number | Array<string>) => {
  let result;

  if (typeof runtime === "number" && runtime < 60) {
    result = `| ${runtime}m`;
  } else if (typeof runtime === "number" && runtime > 60) {
    const hours = Math.trunc(runtime / 60);
    const minutes = runtime - hours * 60;

    result = `| ${hours}h ${minutes}m`;
  } else {
    return null;
  }

  return result;
};

//Utility which would change passed string to url-ish string.
//Removes spaces, special characters and, replaces spaces with dashes and turns to lowercase
const handleStringToUrl = (string: string) => {
  const result = string
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase();

  if (result === "") return string;

  return result;
};

export { handleDate, handleRuntimeFormat, handleStringToUrl };
