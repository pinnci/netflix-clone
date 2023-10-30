import cx from "classnames";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type DashboardMoviePopUp = {
  title: string;
  movieId: number;
  imageSrc: string;
  className?: string;
  currentLocale: string;
  position: "left" | "center" | "right";
} & React.ComponentProps<"div">;

const DashboardMoviePopUp = ({
  title,
  movieId,
  imageSrc,
  currentLocale,
  className,
  position,
  ...other
}: DashboardMoviePopUp) => {
  const [movieData, setMovieData] = useState<any>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const classes = cx(
    "dashboard-movie-pop-up__wrapper outline-0 absolute top-1/2 left-1/2 z-10 rounded-md",
    {
      [`dashboard-movie-pop-up--${position}`]: position,
      ["dashboard-movie-pop-up--active"]: isHovered,
    },
    className,
  );

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&append_to_response=videos&language=${currentLocale}`,
      )
      .then((response) => {
        setMovieData(response.data);
      })
      .catch((error) => {
        axios
          .get(
            `https://api.themoviedb.org/3/tv/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&append_to_response=videos&language=${currentLocale}`,
          )
          .then((response) => {
            setMovieData(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      });
  }, [movieId, currentLocale]);

  return (
    <Link
      href={`/movies/${movieId}`}
      className={classes}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="dashboard-movie-pop-up overflow-hidden" {...other}>
        <Image
          src={imageSrc}
          className="object-cover object-center h-auto w-full rounded-md"
          alt={title}
          width={400}
          height={250}
        />

        <div className="dashboard-movie-pop-up__content p-4">
          <p className="text-white text-lg mb-4">{title}</p>

          <div className="flex flex-wrap">
            {movieData?.genres.map((genre: { name: string }, i: number) => {
              return (
                <div className="flex items-center" key={i}>
                  <span className="text-white font-light">{genre.name}</span>

                  {i + 2 > movieData.genres.length ? null : (
                    <span className="text-gray-500 mx-1">•</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DashboardMoviePopUp;
