import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import cx from "classnames";
import Image from "next/image";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

import Container from "../Container/Container";
import MovieTypeIndicator from "../MovieTypeIndicator/MovieTypeIndicator";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import { useTranslation } from "react-i18next";
import { handleStringToUrl } from "@/utils/utils";

type DashboardBanner = {
  className?: string;
} & React.ComponentProps<"div">;

type MovieData = {
  title: string;
  id: number;
  posterPath: string;
  backdropPath: string;
  currentLocale: string;
  originalName: string;
  releaseDate: string;
  firstAirDate: string;
  lastAirDate: string;
  runtime: number;
  genres: [{ name: string }];
  tagline: string;
  overview: string;
  originalTitle: string;
  productionCompanies: [{ name: string }];
  productionCountries: [{ name: string }];
  spokenLanguages: [{ name: string }];
  videos: [{ key: string; site: string }];
  mediaType: "tv" | "movie";
} | null;

const DashboardBanner = ({ className, ...other }: DashboardBanner) => {
  const [movieData, setMovieData] = useState<null | MovieData>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentLocale, setCurrentLocale] = useState<null | string>(null);
  const [transitionType, setTransitionType] = useState<"fadeIn" | null>(null);
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const classes = cx(
    "dashboard-banner relative z-10 h-auto overflow-hidden",
    className,
  );

  const router = useRouter();

  const { t } = useTranslation("popup");

  useEffect(() => {
    if (router.locale === "en") {
      setCurrentLocale("en-US");
    }

    if (router.locale === "cs") {
      setCurrentLocale("cs-CZ");
    }

    if (currentLocale)
      axios
        .get(
          `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${currentLocale}`,
        )
        .then((response) => {
          const trendingMovies = response.data.results;

          axios
            .get(
              `https://api.themoviedb.org/3/movie/${trendingMovies[0].id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&append_to_response=videos&language=${currentLocale}`,
            )
            .then((response) => {
              setMovieData({
                title:
                  response.data.name ||
                  response.data.title ||
                  response.data.original_title,
                id: response.data.id,
                posterPath: `https://image.tmdb.org/t/p/original${response.data.poster_path}`,
                backdropPath: `https://image.tmdb.org/t/p/original${response.data.backdrop_path}`,
                genres: response.data.genres,
                currentLocale: currentLocale,
                releaseDate: response.data.release_date,
                firstAirDate: response.data.first_air_date,
                lastAirDate: response.data.last_air_date,
                originalName: response.data.original_name,
                runtime:
                  response.data.runtime || response.data.episode_run_time,
                tagline: response.data.tagline,
                overview: response.data.overview,
                originalTitle: response.data.original_title,
                productionCompanies: response.data.production_companies,
                productionCountries: response.data.production_countries,
                spokenLanguages: response.data.spoken_languages,
                videos: response.data.videos.results.filter((video: any) => {
                  if (
                    (video.type === "Teaser" ||
                      video.type === "Trailer" ||
                      video.type === "Official Trailer") &&
                    video.site === "YouTube"
                  ) {
                    return video;
                  }
                }),
                mediaType: "movie",
              });

              setTimeout(() => {
                setIsLoading(false);
              }, 1000);
            });
        })
        .catch((err) => {
          console.log(err);
        });
  }, [currentLocale, router.locale]);

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
          movieId={movieData.id}
          mediaType={movieData.mediaType}
        />
      )}
    </>
  );
};

export default DashboardBanner;
