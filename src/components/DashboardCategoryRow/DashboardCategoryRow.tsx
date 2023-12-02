import { useEffect, useState } from "react";
import cx from "classnames";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper";
import { useTranslation } from "next-i18next";
import DashboardMovie from "../DashboardMovie/DashboardMovie";
import Icon from "../Icon/Icon";

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
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isSwiperHovered, setIsSwiperHovered] = useState<boolean>(false);
  const [swiperReachedBeginning, setSwiperReachedBeginning] =
    useState<boolean>(true);
  const [swiperReachedEnd, setSwiperReachedEnd] = useState<boolean>(false);

  const [isNextButtonFocused, setIsNextButtonFocused] =
    useState<boolean>(false);
  const [isPrevButtonFocused, setIsPrevButtonFocused] =
    useState<boolean>(false);

  const classes = cx("relative", className);

  const { t } = useTranslation("dashboard");

  useEffect(() => {
    axios
      .get(fetchUrl)
      .then((response) => {
        //Not every movie has backdrop_path provided in response, which means that not every movie will be shown with image
        const moviesWithBackdropPath = response.data.results.filter(
          (movie: any) => {
            if (movie.backdrop_path !== null && movie.poster_path !== null) {
              return movie;
            }
          },
        );

        setMovies(moviesWithBackdropPath);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [fetchUrl]);

  return (
    <div className={classes} {...other}>
      <p className="text-white text-xl mb-2">{title}</p>

      <div
        onMouseEnter={() => setIsSwiperHovered(true)}
        onMouseLeave={() => setIsSwiperHovered(false)}
      >
        <Swiper
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          allowSlidePrev
          allowSlideNext
          watchSlidesProgress
          modules={[Navigation, Keyboard]}
          slidesPerView={3.1}
          allowTouchMove={true}
          keyboard={{
            enabled: false,
          }}
          loop={false}
          onRealIndexChange={(swiper) => {
            setActiveIndex(swiper.activeIndex);
            if (swiper.isEnd) {
              setSwiperReachedEnd(true);
            } else {
              setSwiperReachedEnd(false);
            }

            if (swiper.isBeginning) {
              setSwiperReachedBeginning(true);
            } else {
              setSwiperReachedBeginning(false);
            }
          }}
          spaceBetween={10}
          breakpoints={{
            1280: {
              slidesPerView: 7,
              slidesPerGroup: 7,
              allowTouchMove: false,
            },
            1024: {
              slidesPerView: 6,
              slidesPerGroup: 6,
              allowTouchMove: true,
            },
            768: {
              slidesPerView: 5,
            },
            640: {
              slidesPerView: 4,
            },
          }}
        >
          {movies.map((movie: Movie, i) => {
            return (
              <SwiperSlide key={i}>
                <DashboardMovie
                  title={movie.name || movie.title || movie.original_title}
                  id={movie.id}
                  posterPath={movie.poster_path}
                  backdropPath={movie.backdrop_path}
                  currentLocale={currentLocale}
                />
              </SwiperSlide>
            );
          })}
          <button
            className={cx("swiper-button-next", {
              ["swiper-button--active"]:
                (isSwiperHovered && !swiperReachedEnd) ||
                (isNextButtonFocused && !swiperReachedEnd) ||
                isPrevButtonFocused,
            })}
            onFocus={() => setIsNextButtonFocused(true)}
            onBlur={() => setIsNextButtonFocused(false)}
            aria-label={`${t("swiperNextButton")}`}
          >
            <Icon name="chevron-right" size="medium" className="shrink-0" />
          </button>
          <button
            className={cx("swiper-button-prev", {
              ["swiper-button--active"]:
                (isSwiperHovered && activeIndex > 0) ||
                (isNextButtonFocused && activeIndex > 0) ||
                isPrevButtonFocused,
            })}
            onFocus={() => setIsPrevButtonFocused(true)}
            onBlur={() => setIsPrevButtonFocused(false)}
            aria-label={`${t("swiperPrevButton")}`}
          >
            <Icon
              name="chevron-right"
              size="medium"
              className="rotate-180 shrink-0"
            />
          </button>
        </Swiper>
      </div>
    </div>
  );
};

export default DashboardCategoryRow;
