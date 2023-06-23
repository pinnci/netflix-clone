import { useEffect, useState } from "react";
import cx from "classnames";
import axios from "axios";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper";

type DashboardCategoryRow = {
  title: string;
  fetchUrl: string;
  className?: string;
} & React.ComponentProps<"div">;

type Movie = {
  poster_path: string;
  backdrop_path: string;
  title: string;
  original_title: string;
  name: string;
};

const DashboardCategoryRow = ({
  title,
  fetchUrl,
  className,
  ...other
}: DashboardCategoryRow) => {
  const [movies, setMovies] = useState([]);

  const classes = cx("dashboardCategoryRow", className);

  useEffect(() => {
    axios
      .get(fetchUrl)
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [fetchUrl]);

  return (
    <div className={classes} {...other}>
      <p className="text-white text-xl mb-2">{title}</p>

      <Swiper
        navigation={true}
        className="dashboardCategoryRow__swiper"
        modules={[Navigation, Keyboard]}
        slidesPerView={2}
        slidesPerGroup={1}
        keyboard={{
          enabled: true,
        }}
        loop={false}
        spaceBetween={5}
        breakpoints={{
          1280: {
            width: 1280,
            slidesPerView: 6,
            slidesPerGroup: 3,
          },

          1024: {
            width: 1024,
            slidesPerView: 5,
            slidesPerGroup: 3,
          },
          768: {
            width: 768,
            slidesPerView: 4,
            slidesPerGroup: 2,
          },
          640: {
            width: 640,
            slidesPerView: 3,
            slidesPerGroup: 2,
          },
        }}
      >
        {movies.map((movie: Movie, i) => {
          return (
            <SwiperSlide key={i}>
              <div className="dashboardCategoryRow__imageContainer relative">
                <Image
                  src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  className="object-cover object-center w-auto h-auto"
                  alt={
                    movie.title ||
                    movie.original_title ||
                    movie.name ||
                    "Featured title"
                  }
                  width={230}
                  height={150}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default DashboardCategoryRow;
