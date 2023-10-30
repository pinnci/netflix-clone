import { useEffect, useState } from "react";
import cx from "classnames";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper";
import { useTranslation } from "next-i18next";
import DashboardMovie from "../DashboardMovie/DashboardMovie";

type DashboardCategoryRow = {
  title: string;
  fetchUrl: string;
  currentLocale: string;
  className?: string;
} & React.ComponentProps<"div">;

type Movie = {
  poster_path: string;
  backdrop_path: string;
  title: string;
  original_title: string;
  name: string;
  id: number;
};

const DashboardCategoryRow = ({
  title,
  fetchUrl,
  className,
  currentLocale,
  ...other
}: DashboardCategoryRow) => {
  const [movies, setMovies] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  const classes = cx(
    "relative",
    {
      ["z-50"]: isHovered,
    },
    className,
  );

  const { t } = useTranslation("dashboard");

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
    <div
      className={classes}
      {...other}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => {
        setTimeout(() => {
          setIsHovered(false);
        }, 100);
      }}
    >
      <p className="text-white text-xl mb-2">{title}</p>

      <Swiper
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        allowSlidePrev
        allowSlideNext
        watchSlidesProgress
        modules={[Navigation, Keyboard]}
        slidesPerView={2}
        slidesPerGroup={1}
        allowTouchMove={false}
        keyboard={{
          enabled: true,
        }}
        loop={false}
        spaceBetween={5}
        breakpoints={{
          1280: {
            width: 1300,
            slidesPerView: 6,
            slidesPerGroup: 6,
          },

          1024: {
            slidesPerView: 5,
            slidesPerGroup: 3,
          },
          768: {
            slidesPerView: 4,
            slidesPerGroup: 2,
          },
          640: {
            slidesPerView: 3,
            slidesPerGroup: 2,
          },
        }}
      >
        {movies.map((movie: Movie, i) => {
          return (
            <SwiperSlide key={i}>
              <DashboardMovie
                title={movie.title || movie.original_title || movie.name}
                id={movie.id}
                imageSrc={movie.backdrop_path}
                currentLocale={currentLocale}
              />
            </SwiperSlide>
          );
        })}
        <button
          className="swiper-button-next"
          aria-label={`${t("swiperNextButton")}`}
        ></button>
        <button
          className="swiper-button-prev"
          aria-label={`${t("swiperPrevButton")}`}
        ></button>
      </Swiper>
    </div>
  );
};

export default DashboardCategoryRow;
