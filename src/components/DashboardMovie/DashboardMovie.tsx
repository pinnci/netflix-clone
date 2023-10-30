import { useState } from "react";
import DashboardMoviePopUp from "../DashboardMoviePopUp/DashboardMoviePopUp";
import Image from "next/image";

type DashboardMovie = {
  title: string;
  id: number;
  imageSrc: string;
  currentLocale: string;
};

const DashboardMovie = ({
  title,
  id,
  imageSrc,
  currentLocale,
}: DashboardMovie) => {
  const [popUpVisible, setPopUpVisible] = useState<boolean>(false);
  const [popUpContent, setPopUpContent] = useState<{
    title: string;
    id: number;
    imageSrc: string;
    currentLocale: string;
  } | null>(null);
  const [popUpPosition, setPopUpPosition] =
    useState<DashboardMoviePopUp["position"]>("center");

  const handlePopUp = (
    title: string,
    id: number,
    imageSrc: string,
    currentLocale: string,
    event: any,
  ) => {
    setPopUpContent({
      title: title,
      id: id,
      imageSrc: imageSrc,
      currentLocale: currentLocale,
    });

    setPopUpVisible(true);

    //Calculate Pop-up position
    const rect = event.target.getBoundingClientRect();
    const left = rect.left;
    const right = rect.right;
    const windowInnerWidth = window.innerWidth;

    if (left <= event.target.width) {
      setPopUpPosition("left");
    } else if (windowInnerWidth - right <= event.target.width) {
      setPopUpPosition("right");
    } else {
      setPopUpPosition("center");
    }
  };

  return (
    <>
      <div
        className="dashboardCategoryRow__imageContainer relative"
        onMouseOver={(e) =>
          setTimeout(() => {
            handlePopUp(
              title,
              id,
              `https://image.tmdb.org/t/p/original/${imageSrc}`,
              currentLocale,
              e,
            );
          }, 300)
        }
      >
        <Image
          src={`https://image.tmdb.org/t/p/original/${imageSrc}`}
          className="object-cover object-center w-auto h-auto"
          alt={title}
          width={230}
          height={150}
        />
      </div>

      {popUpVisible && popUpContent ? (
        <DashboardMoviePopUp
          title={popUpContent.title}
          movieId={popUpContent.id}
          imageSrc={popUpContent.imageSrc}
          currentLocale={popUpContent.currentLocale}
          onMouseLeave={() =>
            setTimeout(() => {
              setPopUpVisible(false);
            }, 300)
          }
          position={popUpPosition}
        />
      ) : popUpContent ? (
        <DashboardMoviePopUp
          title={popUpContent.title}
          movieId={popUpContent.id}
          imageSrc={popUpContent.imageSrc}
          currentLocale={popUpContent.currentLocale}
          className="hidden"
          onMouseLeave={() =>
            setTimeout(() => {
              setPopUpVisible(false);
            }, 300)
          }
          position={popUpPosition}
        />
      ) : null}
    </>
  );
};

export default DashboardMovie;
