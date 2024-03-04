import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import cx from "classnames";
import DashboardCategoryRow from "../DashboardCategoryRow/DashboardCategoryRow";
import ReactPlayer from "react-player/youtube";

import {
  handleDate,
  handleRuntimeFormat,
  handleStringToUrl,
} from "../../utils/utils";
import Button from "../Button/Button";

import { MovieData, getSimilarMovies, getModalData } from "../../utils/utils";

type Modal = {
  isOpened: boolean;
  onClose: () => void;
  className?: string;
  id: MovieData["id"];
  locale: MovieData["locale"];
  mediaType: MovieData["mediaType"];
};

type Movie = {
  poster_path: MovieData["posterPath"];
  backdrop_path: MovieData["backdropPath"];
  title?: MovieData["title"];
  original_title: MovieData["originalTitle"];
  name?: MovieData["name"];
  id: MovieData["id"];
  media_type: MovieData["mediaType"];
};

const Modal = ({
  className,
  isOpened,
  onClose,
  id,
  locale,
  mediaType,
}: Modal) => {
  const [modalData, setModalData] = useState<any>(null);
  const [similarMovies, setSimilarMovies] = useState<Movie[] | null>(null);
  const [pageYoffset, setPageYoffset] = useState<number>(0);
  const [transitionType, setTransitionType] = useState<
    "fadeIn" | "fadeOut" | null
  >(null);

  const modalOverlayRef = useRef<HTMLDivElement | null>(null);

  const { t } = useTranslation("modal");

  const classes = cx(
    "modal fixed left-1/2 overflow-y-auto z-50 rounded-md w-full h-full max-h-full top-0 sm:top-16 sm:w-11/12 sm:h-auto md:w-11/12 lg:w-9/12 xl:w-8/12",
    {
      ["modal--active"]: transitionType === "fadeIn",
      ["modal--inActive"]: transitionType === "fadeOut",
    },
    className,
  );

  const overlayClasses = cx(
    "modal__overlay z-50 fixed top-0 right-0 bottom-0 left-0",
    {
      ["modal__overlay--active"]: transitionType === "fadeIn",
      ["modal__overlay--inActive"]: transitionType === "fadeOut",
    },
  );

  const modalRoot: Element | DocumentFragment =
    document.getElementById("root-modals")!;

  //Prevent scrolling when modal is opened
  //When modal is closed, restore this scroll position
  //Handle fadeIn animation
  useEffect(() => {
    if (isOpened) {
      setTimeout(() => setTransitionType("fadeIn"), 0);

      setPageYoffset(window.scrollY);

      if (pageYoffset)
        document.body.setAttribute(
          "style",
          `position: fixed; top: -${pageYoffset}px; left: 0; right: 0;`,
        );

      return () => {
        document.body.setAttribute("style", "");
      };
    }
  }, [isOpened, pageYoffset]);

  useEffect(() => {
    const config = {
      id,
      locale,
      mediaType,
    };

    getSimilarMovies(config, (response) => {
      setSimilarMovies(response);
    });
  }, [id, locale, mediaType]);

  useEffect(() => {
    const config = {
      id,
      locale,
      mediaType,
    };

    getModalData(config, (response) => {
      setModalData(response);
    });
  }, [id, locale, mediaType]);

  //Handle fadeOut animation and onClose function which passed as a prop
  const handleClose = useCallback(() => {
    setTimeout(() => {
      setTransitionType("fadeOut");

      setTimeout(() => onClose(), 300);

      document.body.setAttribute("style", "");
      window.scrollTo(0, pageYoffset);
    }, 0);
  }, [onClose, pageYoffset]);

  //Support closing modal by pressing ESC button on keyboard
  const handleCloseOnEscKey = useCallback(
    (event: KeyboardEvent) => {
      if (modalOverlayRef.current && event.key === "Escape") {
        modalOverlayRef.current.click();
      }
    },
    [modalOverlayRef],
  );

  useEffect(() => {
    if (isOpened) {
      window.addEventListener("keydown", handleCloseOnEscKey);
    }

    return () => window.removeEventListener("keydown", close);
  }, [handleCloseOnEscKey, isOpened, modalOverlayRef]);

  return (
    <>
      {modalData &&
        isOpened &&
        createPortal(
          <>
            <div
              className={overlayClasses}
              onClick={handleClose}
              ref={modalOverlayRef}
            />
            <div
              className={classes}
              role="dialog"
              aria-hidden={!isOpened}
              tabIndex={-1}
              autoFocus={true}
            >
              <div className="modal__banner relative">
                <Button
                  variant="close"
                  size="medium"
                  shape="rounded"
                  icon={{ name: "close", size: "small" }}
                  className="absolute top-0 right-0 m-4 text-white"
                  onClick={handleClose}
                  aria-label={`${t("closeButtonLabel")}`}
                  autoFocus
                />

                {modalData.videos.length > 0 ? (
                  <ReactPlayer
                    url={`https://youtube.com/watch?v=${modalData.videos[0].key}`}
                    width={"100%"}
                    height={"444px"}
                    playing
                    controls
                    autoFocus
                    muted={false}
                  />
                ) : (
                  <>
                    <Image
                      src={modalData.backdropPath}
                      className="object-cover object-center h-auto w-full rounded-t-md"
                      alt={modalData.title}
                      width={400}
                      height={444}
                      priority
                    />

                    <div className="modal__gradient absolute top-0 left-0 right-0 bottom-0 h-full"></div>
                  </>
                )}
              </div>

              <div className="modal__content overflow-x-hidden">
                <h1 className="text-white text-3xl mt-0 mb-4">
                  {modalData.title}
                </h1>

                <Button
                  variant="secondary"
                  size="medium"
                  href={`/watch/${mediaType}-${id}-${handleStringToUrl(
                    modalData.originalTitle || modalData.originalName,
                  )}`}
                  icon={{ name: "play", size: "small", className: "mr-2" }}
                  className="inline-flex mb-4 text-black"
                  shape="square"
                >
                  {`${t("play")}`}
                </Button>

                <div className="flex flex-wrap items-center mb-4 mt-1">
                  <div className="flex items-center mr-2">
                    {modalData.genres
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
                      modalData.releaseDate,
                      modalData.firstAirDate,
                      modalData.lastAirDate,
                    )}
                  </time>

                  <time className="block text-base font-thin text-white">
                    {handleRuntimeFormat(modalData.runtime)}
                  </time>
                </div>

                <p className="text-white font-thin mb-6">
                  {modalData.overview}
                </p>

                <div className="modal__original-title mb-2">
                  <label className="text-white font-thin mr-2">
                    {`${t("originalTitle")}`}
                  </label>
                  <span className="text-white font-normal">
                    {modalData.originalTitle ?? modalData.title}
                  </span>
                </div>

                <div className="modal__production-countries mb-2">
                  <label className="text-white font-thin mr-2">
                    {`${t("productionCountries")}`}
                  </label>
                  <span className="text-white font-normal">
                    {modalData.productionCountries.map(
                      (country: { name: string }, i: number) => {
                        return i + 1 === modalData.productionCountries.length
                          ? country.name
                          : `${country.name}, `;
                      },
                    )}
                  </span>
                </div>

                <div className="modal__production-companies mb-2">
                  <label className="text-white font-thin mr-2">
                    {`${t("productionCompanies")}`}
                  </label>
                  <span className="text-white font-normal">
                    {modalData.productionCompanies.map(
                      (company: { name: string }, i: number) => {
                        return i + 1 === modalData.productionCompanies.length
                          ? company.name
                          : `${company.name}, `;
                      },
                    )}
                  </span>
                </div>

                <div className="modal__available-languages mb-6">
                  <label className="text-white font-thin mr-2">
                    {`${t("availableLanguages")}`}
                  </label>
                  <span className="text-white font-normal">
                    {modalData.spokenLanguages.map(
                      (language: { name: string }, i: number) => {
                        return i + 1 === modalData.spokenLanguages.length
                          ? language.name
                          : `${language.name}, `;
                      },
                    )}
                  </span>
                </div>

                {similarMovies && (
                  <DashboardCategoryRow
                    title={`${t("similarLabel")}`}
                    locale={locale}
                    data={similarMovies}
                    disablePopUp
                  />
                )}
              </div>
            </div>
          </>,
          modalRoot,
        )}
    </>
  );
};

export default Modal;
