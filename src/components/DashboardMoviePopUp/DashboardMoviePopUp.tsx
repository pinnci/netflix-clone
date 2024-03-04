import cx from "classnames";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import Button from "../Button/Button";

import {
  handleDate,
  handleRuntimeFormat,
  handleStringToUrl,
  getPopUpData,
  MovieData,
} from "../../utils/utils";

type DashboardMoviePopUp = {
  isOpened: boolean;
  trigger: HTMLCanvasElement | null;
  id: MovieData["id"];
  mediaType: MovieData["mediaType"];
  locale: MovieData["locale"];
  className?: string;
  onClose: () => void;
  onPopUpClick: () => void;
};

const DashboardMoviePopUp = ({
  trigger,
  isOpened = false,
  id,
  mediaType,
  locale,
  className,
  onClose,
  onPopUpClick,
  ...other
}: DashboardMoviePopUp) => {
  const [transitionType, setTransitionType] = useState<
    "fadeIn" | "fadeOut" | null
  >(null);
  const [movieData, setMovieData] = useState<MovieData | null>(null);

  const [popUpStyles, setPopUpStyles] = useState<{
    top: number;
    left?: number;
    right?: number;
  }>({
    top: 0,
    left: 0,
    right: 0,
  });

  const [position, setPosition] = useState<"left" | "center" | "right">(
    "center",
  );

  const classes = cx(
    "dashboard-movie-pop-up__wrapper absolute z-50 rounded-md",
    {
      [`dashboard-movie-pop-up--${position}`]: position,
      [`dashboard-movie-pop-up--${position}--active`]:
        transitionType === "fadeIn",
      [`dashboard-movie-pop-up--${position}--inActive`]:
        transitionType === "fadeOut",
    },
    className,
  );

  const { t } = useTranslation("popup");

  const popUpRoot: Element | DocumentFragment =
    document.getElementById("root-popups")!;

  useEffect(() => {
    if (isOpened && trigger) {
      //Calculate Pop-up position
      const rect = trigger.getBoundingClientRect();
      const top = rect.top;
      const left = rect.left;
      const right = rect.right;
      const windowInnerWidth = window.innerWidth;

      if (left <= trigger.width) {
        setPopUpStyles({
          top: window.scrollY + top + rect.height / 2,
          left: left,
        });
        setPosition("left");
      } else if (windowInnerWidth - right <= trigger.width) {
        setPopUpStyles({
          top: window.scrollY + top + rect.height / 2,
          right: windowInnerWidth - right,
        });
        setPosition("right");
      } else {
        setPopUpStyles({
          top: window.scrollY + top + rect.height / 2,
          left: left + rect.width / 2,
        });
        setPosition("center");
      }

      setTimeout(() => setTransitionType("fadeIn"), 300);
    }
  }, [isOpened, trigger, popUpRoot]);

  useEffect(() => {
    const config = {
      id,
      locale,
      mediaType,
    };

    getPopUpData(config, (response) => {
      setMovieData(response);
    });
  }, [id, locale, mediaType]);

  const handleClose = () => {
    setTimeout(() => {
      setTransitionType("fadeOut");

      setTimeout(() => onClose(), 300);
    }, 0);
  };

  return movieData && isOpened && trigger
    ? createPortal(
        <div
          className={classes}
          onMouseLeave={handleClose}
          style={popUpStyles}
          role="dialog"
          aria-hidden={!isOpened}
          tabIndex={-1}
          aria-label={movieData.title}
          autoFocus={true}
          {...other}
        >
          <div className="dashboard-movie-pop-up overflow-hidden" {...other}>
            <Image
              src={movieData.backdropPath}
              className="object-cover object-center h-auto w-full rounded-t-md"
              alt={movieData.title}
              width={400}
              height={250}
              priority
            />

            <div className="dashboard-movie-pop-up__gradient absolute top-0 left-0 right-0 bottom-0"></div>

            <div className="dashboard-movie-pop-up__content p-5">
              <h3 className="text-white text-3xl mb-1">{movieData.title}</h3>

              {movieData.tagline && (
                <span className="block text-base font-extralight text-white mb-2">
                  {movieData.tagline}
                </span>
              )}

              <div className="flex flex-wrap items-center mt-1 mb-4">
                <div className="flex items-center mr-2">
                  {movieData.genres
                    .slice(0, 3)
                    .map((genre: { name: string }, i: number) => {
                      return (
                        <span
                          className="text-white border border-white rounded-3xl py-1 px-2 uppercase text-xs font-extralight block mr-1.5"
                          key={i}
                        >
                          {genre.name}
                        </span>
                      );
                    })}
                </div>

                <time className="block text-base font-thin text-white mr-1">
                  {handleDate(
                    movieData.releaseDate,
                    movieData.firstAirDate,
                    movieData.lastAirDate,
                  )}
                </time>

                <time className="block text-base font-thin text-white">
                  {handleRuntimeFormat(movieData.runtime)}
                </time>
              </div>

              <div className="flex justify-between">
                <Button
                  variant="secondary"
                  size="medium"
                  shape="square"
                  className="text-black"
                  href={`/watch/${mediaType}-${id}-${handleStringToUrl(
                    movieData.originalTitle || movieData.originalName,
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
                  onClick={() => {
                    handleClose();
                    onPopUpClick();
                  }}
                >
                  {`${t("moreInformation")}`}
                </Button>
              </div>
            </div>
          </div>
        </div>,
        popUpRoot,
      )
    : null;
};

export default DashboardMoviePopUp;
