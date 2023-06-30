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
} & React.ComponentProps<"div">;

const DashboardMoviePopUp = ({
  title,
  movieId,
  imageSrc,
  currentLocale,
  className,
  ...other
}: DashboardMoviePopUp) => {
  const [movieData, setMovieData] = useState<any>(null);

  const classes = cx(
    "dashboardMoviePopUp overflow-hidden rounded-md shadow-md",
    className,
  );

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&append_to_response=videos&language=${currentLocale}`,
      )
      .then((response) => {
        setMovieData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        axios
          .get(
            `https://api.themoviedb.org/3/tv/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&append_to_response=videos&language=${currentLocale}`,
          )
          .then((response) => {
            setMovieData(response.data);
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      });
  }, [movieId, currentLocale]);

  return (
    <Link href={`/movies/${movieId}`}>
      <div className={classes} {...other}>
        <Image
          src={imageSrc}
          className="object-cover object-center w-auto h-auto"
          alt={title}
          width={230}
          height={150}
        />

        <div className="dashboardMoviePopUp__content p-4">
          <p className="text-white text-lg">{title}</p>

          {movieData?.genres.map((genre: { name: string }, i: number) => {
            return (
              <span key={i} className="text-white">
                {genre.name}
              </span>
            );
          })}
        </div>
      </div>
    </Link>
  );
};

export default DashboardMoviePopUp;
