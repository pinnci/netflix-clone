import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import DashboardMoviePopUp from "../DashboardMoviePopUp/DashboardMoviePopUp";
import Modal from "../Modal/Modal";

type DashboardMovie = {
  title: string;
  id: number;
  posterPath: string;
  backdropPath: string;
  currentLocale: string;
};

type MovieData = {
  title: string;
  id: number;
  posterPath: string;
  backdropPath: string;
  currentLocale: string;
  releaseDate: string;
  firstAirDate: string;
  lastAirDate: string;
  runtime: number;
  genres: [{ name: string }];
  tagline: string;
  overview: string;
  originalTitle: string;
  productionCompanies: [{ name: string }];
  productionCountries: [{ name: string }];
  spokenLanguages: [{ name: string }];
  videos: [{ key: string; site: string }];
  mediaType: "tv" | "movie";
} | null;

const DashboardMovie = ({
  title,
  id,
  posterPath,
  backdropPath,
  currentLocale,
  ...other
}: DashboardMovie) => {
  const [movieData, setMovieData] = useState<MovieData>(null);
  const [isPopUpOpened, setIsPopUpOpened] = useState<boolean>(false);
  const [popUpTrigger, setPopUpTrigger] = useState<HTMLCanvasElement | null>(
    null,
  );
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [showPopUpTimer, setShowPopUpTimer] = useState<any>(null);

  const handleMouseEnter = (event: any) => {
    setShowPopUpTimer(
      setTimeout(() => {
        setPopUpTrigger(event.target);
        setIsPopUpOpened(true);
      }, 500),
    );
  };

  const handleMouseLeave = () => {
    clearTimeout(showPopUpTimer);
    setShowPopUpTimer(null);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&append_to_response=videos&language=${currentLocale}`,
      )
      .then((response) => {
        if (
          id === response.data.id &&
          title ===
            (response.data.name ||
              response.data.title ||
              response.data.original_title)
        ) {
          setMovieData({
            title:
              response.data.name ||
              response.data.title ||
              response.data.original_title,
            id: id,
            posterPath: `https://image.tmdb.org/t/p/original${posterPath}`,
            backdropPath: `https://image.tmdb.org/t/p/original${backdropPath}`,
            genres: response.data.genres,
            currentLocale: currentLocale,
            releaseDate: response.data.release_date,
            firstAirDate: response.data.first_air_date,
            lastAirDate: response.data.last_air_date,
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
          });
        } else {
          axios
            .get(
              `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&append_to_response=videos&language=${currentLocale}`,
            )
            .then((response) => {
              setMovieData({
                title:
                  response.data.name ||
                  response.data.title ||
                  response.data.original_title,
                id: id,
                posterPath: `https://image.tmdb.org/t/p/original${posterPath}`,
                backdropPath: `https://image.tmdb.org/t/p/original${backdropPath}`,
                genres: response.data.genres,
                currentLocale: currentLocale,
                releaseDate: response.data.release_date,
                firstAirDate: response.data.first_air_date,
                lastAirDate: response.data.last_air_date,
                runtime:
                  response.data.runtime || response.data.episode_run_time,
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
                mediaType: "tv",
              });
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
            `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&append_to_response=videos&language=${currentLocale}`,
          )
          .then((response) => {
            setMovieData({
              title:
                response.data.name ||
                response.data.title ||
                response.data.original_title,
              id: id,
              posterPath: `https://image.tmdb.org/t/p/original${posterPath}`,
              backdropPath: `https://image.tmdb.org/t/p/original${backdropPath}`,
              genres: response.data.genres,
              currentLocale: currentLocale,
              releaseDate: response.data.release_date,
              firstAirDate: response.data.first_air_date,
              lastAirDate: response.data.last_air_date,
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
              mediaType: "tv",
            });
          })
          .catch((error) => {
            if (error.code === "ERR_BAD_REQUEST") return;
            console.error("TV show not found!", error);
          });
      });
  }, [id, currentLocale, posterPath, backdropPath, title]);

  return (
    <>
      <div
        className="relative cursor-pointer"
        //tabIndex={0}
        aria-label={title}
        onMouseEnter={(e) => handleMouseEnter(e)}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          setIsPopUpOpened(false);
          setPopUpTrigger(null);
          setIsModalOpened(true);
        }}
        {...other}
      >
        <Image
          src={`https://image.tmdb.org/t/p/original/${posterPath}`}
          className="object-cover object-center w-auto h-auto rounded-md"
          alt={title}
          width={180}
          height={260}
          priority
        />
      </div>

      {movieData && (
        <DashboardMoviePopUp
          trigger={popUpTrigger}
          title={title}
          originalTitle={movieData.originalTitle}
          movieId={movieData.id}
          backdropPath={movieData.backdropPath}
          currentLocale={movieData.currentLocale}
          isOpened={isPopUpOpened}
          onClose={() => {
            setIsPopUpOpened(false);
            setPopUpTrigger(null);
          }}
          genres={movieData.genres}
          tagline={movieData.tagline}
          runtime={movieData.runtime}
          releaseDate={movieData.releaseDate}
          firstAirDate={movieData.firstAirDate}
          lastAirDate={movieData.lastAirDate}
          onPopUpClick={() => setIsModalOpened(true)}
        />
      )}

      {movieData && (
        <Modal
          isOpened={isModalOpened}
          onClose={() => {
            setIsPopUpOpened(false);
            setPopUpTrigger(null);
            setIsModalOpened(false);
          }}
          title={title}
          genres={movieData.genres}
          releaseDate={movieData.releaseDate}
          runtime={movieData.runtime}
          originalTitle={movieData.originalTitle}
          productionCompanies={movieData.productionCompanies}
          productionCountries={movieData.productionCountries}
          spokenLanguages={movieData.spokenLanguages}
          firstAirDate={movieData.firstAirDate}
          lastAirDate={movieData.lastAirDate}
          overview={movieData.overview}
          backdropPath={movieData.backdropPath}
          videos={movieData.videos}
          movieId={movieData.id}
          mediaType={movieData.mediaType}
        />
      )}
    </>
  );
};

export default DashboardMovie;
