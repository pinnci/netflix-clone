import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import cx from "classnames";
import Image from "next/image";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

import Container from "../Container/Container";
import MovieTypeIndicator from "../MovieTypeIndicator/MovieTypeIndicator";

type DashboardBanner = {
  className?: string;
} & React.ComponentProps<"div">;

type HeroBannerImage = {
  backdrop_path: string;
  title: string;
  original_title: string;
  name: string;
  media_type: string;
  overview: string;
};

const DashboardBanner = ({ className, ...other }: DashboardBanner) => {
  const [heroBannerImage, setHeroBannerImage] =
    useState<null | HeroBannerImage>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentLocale, setCurrentLocale] = useState<null | string>(null);
  const [transitionType, setTransitionType] = useState<"fadeIn" | null>(null);

  const classes = cx("dashboard-banner relative z-10", className);

  const router = useRouter();

  const randomIntFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

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
        .then((res) => {
          const movies = res.data.results;

          setHeroBannerImage(movies[randomIntFromInterval(0, movies.length)]);

          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [currentLocale, router.locale]);

  useEffect(() => {
    if (!isLoading) setTimeout(() => setTransitionType("fadeIn"), 0);
  }, [isLoading]);

  return (
    <div className={classes} {...other}>
      <div
        className={cx("dashboard-banner__imageContainer relative w-full", {
          ["dashboard-banner__imageContainer--active"]:
            transitionType === "fadeIn",
        })}
      >
        {isLoading ? (
          <Skeleton baseColor="#202020" highlightColor="#303030" width={500} />
        ) : (
          <Image
            src={`https://image.tmdb.org/t/p/original/${heroBannerImage?.backdrop_path}`}
            className="object-cover object-center"
            alt={
              heroBannerImage?.title ||
              heroBannerImage?.original_title ||
              heroBannerImage?.name ||
              "Featured title"
            }
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

              <Skeleton
                baseColor="#202020"
                highlightColor="#303030"
                count={4}
                width={500}
              />
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
              <MovieTypeIndicator mediaType={heroBannerImage?.media_type!} />

              <h1 className="font-black text-white mt-0 mb-4 sm:w-9/12 md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
                {heroBannerImage?.title ||
                  heroBannerImage?.original_title ||
                  heroBannerImage?.name ||
                  "Featured title"}
              </h1>

              <p className="text-base font-light text-white sm:max-w-xl">
                {heroBannerImage?.overview}
              </p>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default DashboardBanner;
