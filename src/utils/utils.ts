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
    id: number;
    title: string;
    locale: Locale["locale"];
    backdropPath: string;
    posterPath: string;
  },
  successCallback: (response: any) => void,
) => {
  const { id, title, locale, backdropPath, posterPath } = config;

  let result: MovieData;

  axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&append_to_response=videos&language=${locale}`,
    )
    .then((response) => {
      if (
        id === response.data.id &&
        title ===
          (response.data.name ||
            response.data.title ||
            response.data.original_title)
      ) {
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
          videos: response.data.videos.results.filter((video: any) => {
            if (
              (video.type === "Teaser" ||
                video.type === "Trailer" ||
                video.type === "Official Trailer") &&
              video.site === "YouTube"
            ) {
              return video;
            }
          }),
          mediaType: "movie",
        };

        successCallback(result);
      } else {
        axios
          .get(
            `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&append_to_response=videos&language=${locale}`,
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
              videos: response.data.videos.results.filter((video: any) => {
                if (
                  (video.type === "Teaser" ||
                    video.type === "Trailer" ||
                    video.type === "Official Trailer") &&
                  video.site === "YouTube"
                ) {
                  return video;
                }
              }),
              mediaType: "tv",
            };

            successCallback(result);
          })
          .catch((error) => {
            if (error.code === "ERR_BAD_REQUEST") return;
            console.error("TV show not found!", error);
          });
      }
    })
    .catch((error) => {
      console.error("Movie not found!", error);

      axios
        .get(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&append_to_response=videos&language=${locale}`,
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
            videos: response.data.videos.results.filter((video: any) => {
              if (
                (video.type === "Teaser" ||
                  video.type === "Trailer" ||
                  video.type === "Official Trailer") &&
                video.site === "YouTube"
              ) {
                return video;
              }
            }),
            mediaType: "tv",
          };

          successCallback(result);
        })
        .catch((error) => {
          if (error.code === "ERR_BAD_REQUEST") return;
          console.error("TV show not found!", error);
        });
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
      const trendingMovies = response.data.results;

      axios
        .get(
          `https://api.themoviedb.org/3/movie/${trendingMovies[0].id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&append_to_response=videos&language=${locale}`,
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
            videos: response.data.videos.results.filter((video: any) => {
              if (
                (video.type === "Teaser" ||
                  video.type === "Trailer" ||
                  video.type === "Official Trailer") &&
                video.site === "YouTube"
              ) {
                return video;
              }
            }),
            mediaType: "movie",
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

  //Not every movie has backdrop_path provided in response, which means that not every movie will be shown with image
  let result;

  axios
    .get(fetchUrl)
    .then((response) => {
      if (response.data.results) {
        result = response.data.results.filter((movie: any) => {
          if (movie.backdrop_path !== null && movie.poster_path !== null) {
            return movie;
          }
        });
      } else {
        result = response.data.similar.results.filter((movie: any) => {
          if (movie.backdrop_path !== null && movie.poster_path !== null) {
            return movie;
          }
        });
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
