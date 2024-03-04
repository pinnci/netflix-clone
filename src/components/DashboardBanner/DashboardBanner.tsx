import { useEffect, useState } from "react";
import cx from "classnames";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";

import Container from "../Container/Container";
import MovieTypeIndicator from "../MovieTypeIndicator/MovieTypeIndicator";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import { useTranslation } from "next-i18next";
import { handleStringToUrl } from "@/utils/utils";

import { MovieData } from "../../utils/utils";

type DashboardBanner = {
  movieData: {
    name: MovieData["name"];
    title: MovieData["title"];
    mediaType: MovieData["mediaType"];
    overview: MovieData["overview"];
    original_name: MovieData["originalName"];
    id: MovieData["id"];
    genres: MovieData["genres"];
    runtime: MovieData["runtime"];
    release_date: MovieData["releaseDate"];
    production_companies: MovieData["productionCompanies"];
    production_countries: MovieData["productionCountries"];
    spoken_languages: MovieData["spokenLanguages"];
    first_air_date: MovieData["firstAirDate"];
    last_air_date: MovieData["lastAirDate"];
    videos: MovieData["videos"];
    original_title: MovieData["originalTitle"];
    backdrop_path: MovieData["backdropPath"];
  };
  className?: string;
  locale: MovieData["locale"];
} & React.ComponentProps<"div">;

const DashboardBanner = ({
  movieData,
  className,
  locale,
  ...other
}: DashboardBanner) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [transitionType, setTransitionType] = useState<"fadeIn" | null>(null);
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const classes = cx(
    "dashboard-banner relative z-10 h-auto overflow-hidden",
    className,
  );

  const { t } = useTranslation("popup");

  useEffect(() => {
    if (movieData)
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
  }, [locale, movieData]);

  useEffect(() => {
    if (!isLoading) setTimeout(() => setTransitionType("fadeIn"), 100);
  }, [isLoading]);

  return (
    <>
      <div className={classes} {...other}>
        <div
          className={cx("dashboard-banner__imageContainer relative w-full", {
            ["dashboard-banner__imageContainer--active"]:
              transitionType === "fadeIn",
          })}
        >
          {isLoading ? (
            <Skeleton
              baseColor="#202020"
              highlightColor="#303030"
              width={500}
            />
          ) : (
            <Image
              src={`https://image.tmdb.org/t/p/original/${movieData.backdrop_path}`}
              className="object-cover object-center"
              alt={
                movieData.name || movieData.title || movieData.original_title
              }
              fill
              priority
              sizes="(max-width: 420px) 420px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1280px) 1280px , (max-width: 1536px) 1536px"
            />
          )}
        </div>
        <div className="dashboard-banner__gradient absolute top-0 left-0 right-0 bottom-0"></div>

        <div className="w-full z-20 relative md:absolute bottom-28 left-0">
          <Container className="pt-6 min-h-60 sm:min-h-64">
            {isLoading ? (
              <span className="block">
                <Skeleton
                  baseColor="#202020"
                  highlightColor="#303030"
                  className="mb-1 !w-10 !h-6 xl:!w-16"
                />

                <Skeleton
                  baseColor="#202020"
                  highlightColor="#303030"
                  className="mb-2 !w-52 !h-9 md:!w-64 md:!h-12 lg:!w-72 lg:!h-14"
                />

                <div className="w-full sm:w-96">
                  <Skeleton
                    baseColor="#202020"
                    highlightColor="#303030"
                    count={3}
                    width="100%"
                  />
                </div>

                <div className="flex mt-2">
                  <Skeleton
                    baseColor="#202020"
                    highlightColor="#303030"
                    className="mr-4 !w-20 !h-10 "
                  />

                  <Skeleton
                    baseColor="#202020"
                    highlightColor="#303030"
                    className="!w-44 !h-10"
                  />
                </div>
              </span>
            ) : (
              <div
                className={cx("dashboard-banner__content max-w-screen-2xl", {
                  ["dashboard-banner__content--active"]:
                    transitionType === "fadeIn",
                })}
              >
                <MovieTypeIndicator mediaType={movieData.mediaType} />

                <h1 className="font-black text-white mt-0 mb-4 sm:w-9/12 text-3xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
                  {movieData.name ||
                    movieData.title ||
                    movieData.original_title}
                </h1>

                <p className="text-base font-light text-white sm:max-w-xl mb-4 line-clamp-3">
                  {movieData.overview}
                </p>

                <div className="flex">
                  <Button
                    variant="secondary"
                    size="medium"
                    shape="square"
                    className="text-black mr-4"
                    href={`/watch/${movieData.mediaType}-${
                      movieData.id
                    }-${handleStringToUrl(
                      movieData.original_title || movieData.original_name,
                    )}`}
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                    icon={{ name: "play", size: "small", className: "mr-2" }}
                  >
                    {`${t("play")}`}
                  </Button>

                  <Button
                    variant="tertiary"
                    size="medium"
                    shape="square"
                    className="text-white"
                    icon={{ name: "info", size: "small", className: "mr-2" }}
                    onClick={() => setIsModalOpened(true)}
                  >
                    {`${t("moreInformation")}`}
                  </Button>
                </div>
              </div>
            )}
          </Container>
        </div>
      </div>

      {!isLoading && (
        <Modal
          isOpened={isModalOpened}
          onClose={() => {
            setIsModalOpened(false);
          }}
          id={movieData.id}
          mediaType={movieData.mediaType}
          locale={locale}
        />
      )}
    </>
  );
};

export default DashboardBanner;
