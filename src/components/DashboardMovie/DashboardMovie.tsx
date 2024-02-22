import { useEffect, useState } from "react";
import Image from "next/image";
import DashboardMoviePopUp from "../DashboardMoviePopUp/DashboardMoviePopUp";
import Modal from "../Modal/Modal";

import { getDashboardMovieData, MovieData } from "@/utils/utils";

export type DashboardMovie = Omit<
  MovieData,
  | "overview"
  | "productionCompanies"
  | "productionCountries"
  | "spokenLanguages"
  | "videos"
  | "originalTitle"
  | "originalName"
  | "runtime"
  | "releaseDate"
  | "tagline"
  | "firstAirDate"
  | "lastAirDate"
  | "genres"
>;

const DashboardMovie = ({
  title,
  id,
  posterPath,
  backdropPath,
  locale,
  mediaType,
  ...other
}: DashboardMovie) => {
  const [movieData, setMovieData] = useState<MovieData | null>(null);
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
    const config = {
      id,
      title,
      locale,
      backdropPath,
      posterPath,
      mediaType,
    };

    getDashboardMovieData(config, (response) => {
      setMovieData(response);
    });
  }, [id, locale, posterPath, backdropPath, title, mediaType]);

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
          originalName={movieData.originalName}
          id={movieData.id}
          backdropPath={movieData.backdropPath}
          locale={movieData.locale}
          isOpened={isPopUpOpened}
          onClose={() => {
            setIsPopUpOpened(false);
            setPopUpTrigger(null);
          }}
          genres={movieData.genres}
          tagline={movieData.tagline}
          mediaType={movieData.mediaType}
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
          originalName={movieData.originalName}
          productionCompanies={movieData.productionCompanies}
          productionCountries={movieData.productionCountries}
          spokenLanguages={movieData.spokenLanguages}
          firstAirDate={movieData.firstAirDate}
          lastAirDate={movieData.lastAirDate}
          overview={movieData.overview}
          backdropPath={movieData.backdropPath}
          videos={movieData.videos}
          id={movieData.id}
          mediaType={movieData.mediaType}
          locale={movieData.locale}
        />
      )}
    </>
  );
};

export default DashboardMovie;
