import { useEffect, useRef, useState } from "react";
import cx from "classnames";
import Image from "next/image";
import DashboardMoviePopUp from "../DashboardMoviePopUp/DashboardMoviePopUp";
import Modal from "../Modal/Modal";

import { MovieData, handleElementInViewport } from "@/utils/utils";

export type DashboardMovie = {
  title: MovieData["title"];
  id: MovieData["id"];
  posterPath: MovieData["posterPath"];
  backdropPath: MovieData["backdropPath"];
  mediaType: MovieData["mediaType"];
  disablePopUp?: boolean;
  className?: string;
  locale: MovieData["locale"];
};

const DashboardMovie = ({
  title,
  id,
  posterPath,
  backdropPath,
  disablePopUp = false,
  className,
  locale,
  mediaType,
  ...other
}: DashboardMovie) => {
  const [isPopUpOpened, setIsPopUpOpened] = useState<boolean>(false);
  const [popUpTrigger, setPopUpTrigger] = useState<HTMLCanvasElement | null>(
    null,
  );
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [showPopUpTimer, setShowPopUpTimer] = useState<any>(null);
  const [isImageInViewport, setIsImageInViewport] = useState<boolean>(false);

  const classes = cx(
    "dashboard-movie relative w-full cursor-pointer",
    className,
  );

  const handleMouseEnter = (event: any) => {
    setShowPopUpTimer(
      setTimeout(() => {
        setPopUpTrigger(event.target);
        setIsPopUpOpened(true);
      }, 500),
    );
  };

  const handleMouseLeave = () => {
    clearTimeout(showPopUpTimer);
    setShowPopUpTimer(null);
  };

  const imageContainerRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageContainerRef.current)
      setIsImageInViewport(handleElementInViewport(imageContainerRef.current));
  }, []);

  return (
    <>
      <div
        className={classes}
        //tabIndex={0}
        aria-label={title}
        onMouseEnter={(e) => handleMouseEnter(e)}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          setIsPopUpOpened(false);
          setPopUpTrigger(null);
          setIsModalOpened(true);
        }}
        {...other}
      >
        <Image
          src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
          className="rounded-md"
          alt={title}
          fill
          sizes="(max-width: 420px) 100px, (max-width: 768px) 130px, (max-width: 1024px) 130px, (max-width: 1280px) 130px , (max-width: 1536px) 130px"
          priority={isImageInViewport}
          ref={imageContainerRef}
        />
      </div>

      {!disablePopUp && isPopUpOpened && popUpTrigger && (
        <DashboardMoviePopUp
          trigger={popUpTrigger}
          id={id}
          mediaType={mediaType}
          locale={locale}
          isOpened={isPopUpOpened}
          onClose={() => {
            setIsPopUpOpened(false);
            setPopUpTrigger(null);
          }}
          onPopUpClick={() => setIsModalOpened(true)}
        />
      )}

      {isModalOpened && (
        <Modal
          isOpened={isModalOpened}
          onClose={() => {
            setIsPopUpOpened(false);
            setPopUpTrigger(null);
            setIsModalOpened(false);
          }}
          id={id}
          mediaType={mediaType}
          locale={locale}
        />
      )}
    </>
  );
};

export default DashboardMovie;
