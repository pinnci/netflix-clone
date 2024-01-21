import { useEffect, useState } from "react";
import cx from "classnames";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";

import Container from "../Container/Container";
import MovieTypeIndicator from "../MovieTypeIndicator/MovieTypeIndicator";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import { useTranslation } from "react-i18next";
import { getDashboardBannerData, handleStringToUrl } from "@/utils/utils";

import { MovieData } from "../../utils/utils";
import { Locale } from "../../data/languageSelector";

type DashboardBanner = {
  className?: string;
  locale: Locale["locale"];
} & React.ComponentProps<"div">;

const DashboardBanner = ({ className, locale, ...other }: DashboardBanner) => {
  const [movieData, setMovieData] = useState<null | MovieData>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [transitionType, setTransitionType] = useState<"fadeIn" | null>(null);
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const classes = cx(
    "dashboard-banner relative z-10 h-auto overflow-hidden",
    className,
  );

  const { t } = useTranslation("popup");

  useEffect(() => {
    const config = {
      locale,
    };

    getDashboardBannerData(config, (response) => {
      setMovieData(response);

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    });
  }, [locale]);

  useEffect(() => {
    if (!isLoading) setTimeout(() => setTransitionType("fadeIn"), 0);
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
              src={`https://image.tmdb.org/t/p/original/${
                movieData!.backdropPath
              }`}
              className="object-cover object-center"
              alt={movieData!.title}
              fill
              priority
            />
          )}
        </div>
        <div className="dashboard-banner__gradient absolute top-0 left-0 right-0 bottom-0"></div>

        <div className="w-full z-20 absolute bottom-28 left-0">
          <Container className="pt-6">
            {isLoading ? (
              <span className="block mb-10">
                <Skeleton
                  baseColor="#202020"
                  highlightColor="#303030"
                  width={80}
                  height={30}
                  className="mb-4"
                />

                <Skeleton
                  baseColor="#202020"
                  highlightColor="#303030"
                  width={250}
                  height={50}
                  className="mb-4"
                />

                <div className="w-full sm:w-96">
                  <Skeleton
                    baseColor="#202020"
                    highlightColor="#303030"
                    count={4}
                    width="100%"
                  />
                </div>

                <div className="flex mt-4">
                  <Skeleton
                    baseColor="#202020"
                    highlightColor="#303030"
                    width={100}
                    height={40}
                    className="mr-4"
                  />

                  <Skeleton
                    baseColor="#202020"
                    highlightColor="#303030"
                    width={200}
                    height={40}
                  />
                </div>
              </span>
            ) : (
              <div
                className={cx(
                  "dashboard-banner__content max-w-screen-2xl sm:pb-8",
                  {
                    ["dashboard-banner__content--active"]:
                      transitionType === "fadeIn",
                  },
                )}
              >
                <MovieTypeIndicator mediaType={movieData!.mediaType} />

                <h1 className="font-black text-white mt-0 mb-4 sm:w-9/12 md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
                  {movieData!.title}
                </h1>

                <p className="text-base font-light text-white sm:max-w-xl mb-4 line-clamp-3">
                  {movieData?.overview}
                </p>

                <div className="flex">
                  <Button
                    variant="secondary"
                    size="medium"
                    shape="square"
                    className="text-black mr-4"
                    href={`/watch/${movieData?.id}-${handleStringToUrl(
                      movieData?.originalTitle! || movieData?.title!,
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

      {movieData && (
        <Modal
          isOpened={isModalOpened}
          onClose={() => {
            setIsModalOpened(false);
          }}
          originalName={movieData.originalName}
          title={movieData.title}
          genres={movieData.genres}
          releaseDate={movieData.releaseDate}
          runtime={movieData.runtime}
          originalTitle={movieData.originalTitle}
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
          locale={locale}
        />
      )}
    </>
  );
};

export default DashboardBanner;
