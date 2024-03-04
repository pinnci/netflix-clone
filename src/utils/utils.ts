import { Locale } from "../data/languageSelector";

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

export type MovieData = {
  title: string;
  id: number;
  originalTitle: string;
  originalName: string;
  backdropPath: string;
  name?: string;
  runtime: number;
  releaseDate: string;
  tagline: string;
  locale: Locale["locale"];
  firstAirDate: string;
  lastAirDate: string;
  genres: [{ name: string }];
  posterPath: string;
  overview: string;
  productionCompanies: [{ name: string }];
  productionCountries: [{ name: string }];
  spokenLanguages: [{ name: string }];
  videos: [{ key: string; site: string }];
  mediaType: Locale;
};

//Utility used to fetch similar movies
const getSimilarMovies = async (
  config: {
    id: MovieData["id"];
    locale: MovieData["locale"];
    mediaType: MovieData["mediaType"];
  },
  successCallback: (response: any) => void,
) => {
  const { id, locale, mediaType } = config;

  try {
    //Checks for movie or tv show
    const res = await fetch(
      `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${locale}&append_to_response=similar`,
    );
    const data = await res.json();

    const moviesWithImages = data.similar.results.filter((result: any) => {
      if (result.poster_path !== null && result.backdrop_path !== null) {
        return result;
      }
    });

    // Assuming you have an array of objects called data.results
    const updatedResults = moviesWithImages.map((result: any) => {
      // Add the media_type property to the current object
      return { ...result, media_type: mediaType };
    });

    successCallback(updatedResults);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

//Utility used to fetch data for Modal
const getModalData = async (
  config: {
    id: MovieData["id"];
    locale: MovieData["locale"];
    mediaType: MovieData["mediaType"];
  },
  successCallback: (response: any) => void,
) => {
  const { id, locale, mediaType } = config;

  let result: any;

  try {
    //Checks for movie or tv show
    const res = await fetch(
      `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&append_to_response=videos&language=${locale}`,
    );
    const data = await res.json();

    result = {
      title: data.name || data.title || data.original_title,
      id: id,
      backdropPath: `https://image.tmdb.org/t/p/w1280${data.backdrop_path}`,
      genres: data.genres,
      locale: locale,
      releaseDate: data.release_date,
      firstAirDate: data.first_air_date,
      lastAirDate: data.last_air_date,
      runtime: data.runtime || data.episode_run_time,
      overview: data.overview,
      originalTitle: data.original_title,
      originalName: data.original_name,
      productionCompanies: data.production_companies,
      productionCountries: data.production_countries,
      spokenLanguages: data.spoken_languages,
      videos: data.videos.results.filter(
        (video: { type: string; site: string }) => {
          if (
            (video.type === "Teaser" ||
              video.type === "Trailer" ||
              video.type === "Official Trailer") &&
            video.site === "YouTube"
          ) {
            return video;
          }
        },
      ),
      mediaType: mediaType,
    };

    successCallback(result);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

//Utility used to fetch data for DashboardMoviePopUp
const getPopUpData = async (
  config: {
    id: MovieData["id"];
    locale: MovieData["locale"];
    mediaType: MovieData["mediaType"];
  },
  successCallback: (response: any) => void,
) => {
  const { id, locale, mediaType } = config;

  let result: any;

  try {
    //Checks for movie or tv show
    const res = await fetch(
      `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&append_to_response=videos&language=${locale}`,
    );
    const data = await res.json();

    result = {
      title: data.name || data.title || data.original_title,
      id: id,
      backdropPath: `https://image.tmdb.org/t/p/w780${data.backdrop_path}`,
      genres: data.genres,
      locale: locale,
      releaseDate: data.release_date,
      firstAirDate: data.first_air_date,
      lastAirDate: data.last_air_date,
      runtime: data.runtime || data.episode_run_time,
      tagline: data.tagline,
      originalTitle: data.original_title,
      originalName: data.original_name,
      mediaType: mediaType,
    };

    successCallback(result);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const handleElementInViewport = (el: HTMLImageElement) => {
  const rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

export {
  handleDate,
  handleRuntimeFormat,
  handleStringToUrl,
  getSimilarMovies,
  getPopUpData,
  getModalData,
  handleElementInViewport,
};
