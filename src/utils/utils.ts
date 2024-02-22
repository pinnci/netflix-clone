import axios from "axios";
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
  mediaType: "tv" | "movie";
};

//Utility used to fetch data for DashboardMovie
const getDashboardMovieData = (
  config: {
    id: MovieData["id"];
    title: MovieData["title"];
    locale: Locale["locale"];
    backdropPath: MovieData["backdropPath"];
    posterPath: MovieData["posterPath"];
    mediaType: MovieData["mediaType"];
  },
  successCallback: (response: any) => void,
) => {
  const { id, locale, backdropPath, posterPath, mediaType } = config;

  let result: MovieData;

  axios
    .get(
      `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&append_to_response=videos&language=${locale}`,
    )
    .then((response) => {
      result = {
        title:
          response.data.name ||
          response.data.title ||
          response.data.original_title,
        id: id,
        posterPath: `https://image.tmdb.org/t/p/original${posterPath}`,
        backdropPath: `https://image.tmdb.org/t/p/original${backdropPath}`,
        genres: response.data.genres,
        locale: locale,
        releaseDate: response.data.release_date,
        firstAirDate: response.data.first_air_date,
        lastAirDate: response.data.last_air_date,
        runtime: response.data.runtime || response.data.episode_run_time,
        tagline: response.data.tagline,
        overview: response.data.overview,
        originalTitle: response.data.original_title,
        originalName: response.data.original_name,
        productionCompanies: response.data.production_companies,
        productionCountries: response.data.production_countries,
        spokenLanguages: response.data.spoken_languages,
        videos: response.data.videos.results.filter(
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
    });
};

//Utility used to fetch data for DashboardBanner
const getDashboardBannerData = (
  config: {
    locale: Locale["locale"];
  },
  successCallback: (response: any) => void,
) => {
  const { locale } = config;

  let result;

  axios
    .get(
      `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${locale}`,
    )
    .then((response) => {
      const trendingMovie = response.data.results[0];

      axios
        .get(
          `https://api.themoviedb.org/3/${trendingMovie.media_type}/${trendingMovie.id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&append_to_response=videos&language=${locale}`,
        )
        .then((response) => {
          result = {
            title:
              response.data.name ||
              response.data.title ||
              response.data.original_title,
            id: response.data.id,
            posterPath: `https://image.tmdb.org/t/p/original${response.data.poster_path}`,
            backdropPath: `https://image.tmdb.org/t/p/original${response.data.backdrop_path}`,
            genres: response.data.genres,
            locale: locale,
            releaseDate: response.data.release_date,
            firstAirDate: response.data.first_air_date,
            lastAirDate: response.data.last_air_date,
            originalName: response.data.original_name,
            runtime: response.data.runtime || response.data.episode_run_time,
            tagline: response.data.tagline,
            overview: response.data.overview,
            originalTitle: response.data.original_title,
            productionCompanies: response.data.production_companies,
            productionCountries: response.data.production_countries,
            spokenLanguages: response.data.spoken_languages,
            videos: response.data.videos.results.filter(
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
            mediaType: trendingMovie.media_type,
          };

          successCallback(result);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

//Utility used to fetch data for DashboardCategoryRow
const getDashboardCategoryRowData = (
  config: {
    fetchUrl: string;
  },
  successCallback: (response: any) => void,
) => {
  const { fetchUrl } = config;

  //TMDB API does not provide media_type key in response for every movie or tv show but it is marked in fetch url
  const handleCorrectMediaType = (
    movie: { media_type: string },
    fetchUrl: string,
  ) => {
    if (fetchUrl.split("/").some((substring) => substring.includes("tv"))) {
      movie.media_type = "tv";
      return movie;
    } else {
      movie.media_type = "movie";
      return movie;
    }
  };

  //Not every movie has backdrop_path provided in response, which means that not every movie will be shown with image
  let result;

  axios
    .get(fetchUrl)
    .then((response) => {
      if (response.data.results) {
        result = response.data.results.filter(
          (movie: {
            backdrop_path: string;
            poster_path: string;
            media_type: string;
          }) => {
            if (movie.backdrop_path !== null && movie.poster_path !== null) {
              return handleCorrectMediaType(movie, fetchUrl);
            }
          },
        );
      } else {
        result = response.data.similar.results.filter(
          (movie: {
            backdrop_path: string;
            poster_path: string;
            media_type: string;
          }) => {
            if (movie.backdrop_path !== null && movie.poster_path !== null) {
              return handleCorrectMediaType(movie, fetchUrl);
            }
          },
        );
      }

      successCallback(result);
    })
    .catch((error) => {
      console.log(error);
    });
};

export {
  handleDate,
  handleRuntimeFormat,
  handleStringToUrl,
  getDashboardMovieData,
  getDashboardBannerData,
  getDashboardCategoryRowData,
};
