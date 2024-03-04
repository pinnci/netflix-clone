import { useEffect, useState } from "react";
import cx from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper";
import { useTranslation } from "next-i18next";

import DashboardMovie from "../DashboardMovie/DashboardMovie";
import Icon from "../Icon/Icon";
import Skeleton from "react-loading-skeleton";

import { MovieData } from "@/utils/utils";

type DashboardCategoryRow = {
  title: MovieData["title"];
  locale: MovieData["locale"];
  className?: string;
  disablePopUp?: boolean;
  data: Movie[];
} & React.ComponentProps<"div">;

type Movie = {
  poster_path: MovieData["posterPath"];
  backdrop_path: MovieData["backdropPath"];
  title?: MovieData["title"];
  original_title: MovieData["originalTitle"];
  name?: MovieData["name"];
  id: MovieData["id"];
  media_type: MovieData["mediaType"];
};

const DashboardCategoryRow = ({
  title,
  data,
  disablePopUp = false,
  className,
  locale,
  ...other
}: DashboardCategoryRow) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
    if (data)
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
  }, [data]);

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
          <div>
            {isLoading
              ? Array.from({ length: 10 }).map((_, index) => (
                  <SwiperSlide key={index}>
                    <div className="h-52 lg:h-56 xl:h-72 relative w-full cursor-pointer">
                      <Skeleton
                        height="100%"
                        width="100%"
                        baseColor="#202020"
                        highlightColor="#303030"
                      />
                    </div>
                  </SwiperSlide>
                ))
              : data.map((movie: Movie) => {
                  return (
                    <SwiperSlide key={movie.id}>
                      <DashboardMovie
                        title={
                          movie.name || movie.title || movie.original_title
                        }
                        id={movie.id}
                        posterPath={movie.poster_path}
                        backdropPath={movie.backdrop_path}
                        locale={locale}
                        mediaType={movie.media_type}
                        disablePopUp={disablePopUp}
                      />
                    </SwiperSlide>
                  );
                })}
          </div>

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
