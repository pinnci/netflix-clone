import cx from "classnames";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import Button from "../Button/Button";
import { createPortal } from "react-dom";

import {
  handleDate,
  handleRuntimeFormat,
  handleStringToUrl,
} from "../../utils/utils";

import { MovieData } from "../../utils/utils";

type DashboardMoviePopUp = {
  isOpened: boolean;
  trigger: null | HTMLCanvasElement;
  onClose: () => void;
  onPopUpClick: () => void;
  className?: string;
} & Omit<
  MovieData,
  | "posterPath"
  | "overview"
  | "productionCompanies"
  | "productionCountries"
  | "spokenLanguages"
  | "videos"
>;

const DashboardMoviePopUp = ({
  title,
  originalTitle,
  originalName,
  trigger,
  isOpened = false,
  id,
  backdropPath,
  mediaType,
  locale,
  runtime,
  releaseDate,
  firstAirDate,
  lastAirDate,
  tagline,
  genres,
  className,
  onClose,
  onPopUpClick,
  ...other
}: DashboardMoviePopUp) => {
  const [transitionType, setTransitionType] = useState<
    "fadeIn" | "fadeOut" | null
  >(null);

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

  const handleClose = () => {
    setTimeout(() => {
      setTransitionType("fadeOut");

      setTimeout(() => onClose(), 300);
    }, 0);
  };

  if (!isOpened && !trigger) return null;

  return createPortal(
    <div
      className={classes}
      onMouseLeave={handleClose}
      style={popUpStyles}
      role="dialog"
      aria-hidden={!isOpened}
      tabIndex={-1}
      aria-label={title}
      autoFocus={true}
      {...other}
    >
      <div className="dashboard-movie-pop-up overflow-hidden" {...other}>
        <Image
          src={backdropPath}
          className="object-cover object-center h-auto w-full rounded-t-md"
          alt={title}
          width={400}
          height={250}
          priority
        />

        <div className="dashboard-movie-pop-up__gradient absolute top-0 left-0 right-0 bottom-0"></div>

        <div className="dashboard-movie-pop-up__content p-5">
          <h3 className="text-white text-3xl mb-1">{title}</h3>

          {tagline && (
            <span className="block text-base font-extralight text-white mb-2">
              {tagline}
            </span>
          )}

          <div className="flex flex-wrap items-center mt-1 mb-4">
            <div className="flex items-center mr-2">
              {genres.slice(0, 3).map((genre: { name: string }, i: number) => {
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
              {handleDate(releaseDate, firstAirDate, lastAirDate)}
            </time>

            <time className="block text-base font-thin text-white">
              {handleRuntimeFormat(runtime)}
            </time>
          </div>

          <div className="flex justify-between">
            <Button
              variant="secondary"
              size="medium"
              shape="square"
              className="text-black"
              href={`/watch/${mediaType}-${id}-${handleStringToUrl(
                originalTitle || originalName,
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
  );
};

export default DashboardMoviePopUp;
