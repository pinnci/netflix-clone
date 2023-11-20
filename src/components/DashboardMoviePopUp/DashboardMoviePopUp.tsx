import cx from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Button from "../Button/Button";
//import Modal from "../Modal/Modal";

type DashboardMoviePopUp = {
  title: string;
  movieId: number;
  backdropPath: string;
  runtime: number;
  releaseDate: string;
  tagline: string;
  firstAirDate: string;
  lastAirDate: string;
  className?: string;
  genres: any;
  currentLocale: string;
  position: "left" | "center" | "right";
} & React.ComponentProps<"div">;

const DashboardMoviePopUp = ({
  title,
  movieId,
  backdropPath,
  currentLocale,
  runtime,
  releaseDate,
  firstAirDate,
  lastAirDate,
  tagline,
  genres,
  className,
  position,
  ...other
}: DashboardMoviePopUp) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  //const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const classes = cx(
    "dashboard-movie-pop-up__wrapper outline-0 absolute top-1/2 left-1/2 z-10 rounded-md",
    {
      [`dashboard-movie-pop-up--${position}`]: position,
      ["dashboard-movie-pop-up--active"]: isHovered,
    },
    className,
  );

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

    return (
      <span className="block text-base font-light text-neutral-400 mr-1">
        {result}
      </span>
    );
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

    return (
      <span className="block text-base font-light text-neutral-400">
        {result}
      </span>
    );
  };

  return (
    <div
      //href={`/movies/${movieId}`}
      className={classes}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      //onClick={() => setIsModalOpened(true)}
    >
      <div className="dashboard-movie-pop-up overflow-hidden" {...other}>
        <Image
          src={backdropPath}
          className="object-cover object-center h-auto w-full rounded-t-md"
          alt={title}
          width={400}
          height={250}
        />

        <div className="dashboard-movie-pop-up__content p-5">
          <h3 className="text-white text-3xl mb-1">{title}</h3>

          {tagline ? (
            <span className="block text-base font-light text-neutral-400 mb-2">
              {tagline}
            </span>
          ) : null}

          <div className="flex flex-wrap items-center mb-4">
            <div className="flex items-center mt-1 mr-2">
              {genres.slice(0, 3).map((genre: { name: string }, i: number) => {
                return (
                  <span
                    className="text-neutral-400 border border-neutral-400 rounded-3xl py-1 px-2 uppercase text-xs font-normal block mr-1.5"
                    key={i}
                  >
                    {genre.name}
                  </span>
                );
              })}
            </div>

            {handleDate(releaseDate, firstAirDate, lastAirDate)}

            {handleRuntimeFormat(runtime)}
          </div>

          <div className="flex justify-between">
            <Button variant="primary" size="medium">
              Play
            </Button>

            <Button variant="primary" size="medium">
              More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMoviePopUp;
