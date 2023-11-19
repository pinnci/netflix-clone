import { useEffect, useState } from "react";
import DashboardMoviePopUp from "../DashboardMoviePopUp/DashboardMoviePopUp";
import Image from "next/image";
import axios from "axios";

type DashboardMovie = {
  title: string;
  id: number;
  posterPath: string;
  backdropPath: string;
  currentLocale: string;
};

const DashboardMovie = ({
  title,
  id,
  posterPath,
  backdropPath,
  currentLocale,
}: DashboardMovie) => {
  const [popUpVisible, setPopUpVisible] = useState<boolean>(false);
  const [popUpContent, setPopUpContent] = useState<{
    title: string;
    id: number;
    posterPath: string;
    backdropPath: string;
    currentLocale: string;
    releaseDate: string;
    firstAirDate: string;
    lastAirDate: string;
    runtime: number;
    genres: [string];
    tagline: string;
  } | null>(null);
  const [popUpPosition, setPopUpPosition] =
    useState<DashboardMoviePopUp["position"]>("center");

  let showPopUpTimer: ReturnType<typeof setTimeout>;
  let hidePopUpTimer: ReturnType<typeof setTimeout>;

  const handlePopUp = (event: any) => {
    setPopUpVisible(true);

    //Calculate Pop-up position
    const rect = event.target.getBoundingClientRect();
    const left = rect.left;
    const right = rect.right;
    const windowInnerWidth = window.innerWidth;

    if (left <= event.target.width) {
      setPopUpPosition("left");
    } else if (windowInnerWidth - right <= event.target.width) {
      setPopUpPosition("right");
    } else {
      setPopUpPosition("center");
    }
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&append_to_response=videos&language=${currentLocale}`,
      )
      .then((response) => {
        setPopUpContent({
          title: title,
          id: id,
          posterPath: `https://image.tmdb.org/t/p/original/${posterPath}`,
          backdropPath: `https://image.tmdb.org/t/p/original/${backdropPath}`,
          genres: response.data.genres,
          currentLocale: currentLocale,
          releaseDate: response.data.release_date,
          firstAirDate: response.data.first_air_date,
          lastAirDate: response.data.last_air_date,
          runtime: response.data.runtime || response.data.episode_run_time,
          tagline: response.data.tagline,
        });
      })
      .catch((error) => {
        console.error("Movie not found!", error);

        axios
          .get(
            `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&append_to_response=videos&language=${currentLocale}`,
          )
          .then((response) => {
            setPopUpContent({
              title: title,
              id: id,
              posterPath: `https://image.tmdb.org/t/p/original/${posterPath}`,
              backdropPath: `https://image.tmdb.org/t/p/original/${backdropPath}`,
              genres: response.data.genres,
              currentLocale: currentLocale,
              releaseDate: response.data.release_date,
              firstAirDate: response.data.first_air_date,
              lastAirDate: response.data.last_air_date,
              runtime: response.data.runtime || response.data.episode_run_time,
              tagline: response.data.tagline,
            });
          })
          .catch((error) => {
            console.error("TV show not found!", error);
          });
      });
  }, [id, currentLocale, posterPath, backdropPath, title]);

  return (
    <>
      <div className="relative">
        <Image
          src={`https://image.tmdb.org/t/p/original/${posterPath}`}
          className="object-cover object-center w-auto h-auto rounded-md"
          alt={title}
          width={180}
          height={260}
          onMouseOver={(e) =>
            (showPopUpTimer = setTimeout(() => {
              handlePopUp(e);
            }, 800))
          }
          onMouseLeave={() => clearTimeout(showPopUpTimer)}
        />
      </div>

      {popUpVisible && popUpContent ? (
        <DashboardMoviePopUp
          title={popUpContent.title}
          movieId={popUpContent.id}
          backdropPath={popUpContent.backdropPath}
          currentLocale={popUpContent.currentLocale}
          onMouseLeave={() =>
            (hidePopUpTimer = setTimeout(() => {
              setPopUpVisible(false);
            }, 300))
          }
          genres={popUpContent.genres}
          tagline={popUpContent.tagline}
          position={popUpPosition}
          runtime={popUpContent.runtime}
          releaseDate={popUpContent.releaseDate}
          firstAirDate={popUpContent.firstAirDate}
          lastAirDate={popUpContent.lastAirDate}
        />
      ) : null}
    </>
  );
};

export default DashboardMovie;
