import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import cx from "classnames";
import Image from "next/image";
import axios from "axios";

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
  const [currentLocale, setCurrentLocale] = useState<null | string>(null);

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
        })
        .catch((err) => {
          console.log(err);
        });
  }, [currentLocale, router.locale]);

  return (
    <div className={classes} {...other}>
      <div className="dashboard-banner__imageContainer relative w-full">
        <Image
          src={`https://image.tmdb.org/t/p/original/${heroBannerImage?.backdrop_path}`}
          className="object-cover object-left"
          alt={
            heroBannerImage?.title ||
            heroBannerImage?.original_title ||
            heroBannerImage?.name ||
            "Featured title"
          }
          fill
          priority
        />
      </div>
      <div className="dashboard-banner__gradient absolute top-0 left-0 right-0 bottom-0"></div>

      <div className="w-full z-20 absolute bottom-0 left-0">
        <Container className="pt-6">
          <div className="dashboard-banner__content pb-8 max-w-screen-2xl">
            <h1 className="text-5xl font-black text-white mt-4 mb-0 sm:w-9/12">
              {heroBannerImage?.title ||
                heroBannerImage?.original_title ||
                heroBannerImage?.name ||
                "Featured title"}
            </h1>

            {heroBannerImage && (
              <MovieTypeIndicator mediaType={heroBannerImage.media_type} />
            )}

            <p className="text-base font-light text-white sm:max-w-xl">
              {heroBannerImage?.overview}
            </p>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default DashboardBanner;
