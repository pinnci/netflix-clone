import cx from "classnames";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef, useContext, useState } from "react";
import { PathContext } from "@/pages/_app";
import { useTranslation } from "next-i18next";

import Icon from "../Icon/Icon";
import Button from "../Button/Button";

type Search = {
  className?: string;
} & React.ComponentProps<"div">;

const Search = ({ className, ...other }: Search) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [searchedTerm, setSearchedTerm] = useState<string | undefined>("");
  const [isWidthAnimated, setIsWidthAnimated] = useState<boolean>(false);

  const classes = cx("search relative w-full", className);
  const containerClasses = cx(
    "search__container absolute top-1/2 -translate-y-1/2 right-0 overflow-hidden",
    {
      ["search__container--active transition-all duration-500"]:
        isOpened && isWidthAnimated,
      ["transition-none"]: isOpened && searchedTerm,
    },
  );

  const { t } = useTranslation("dashboard");

  const searchParams = useSearchParams();
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  const { path } = useContext(PathContext);

  useEffect(() => {
    if (isOpened) {
      inputRef.current?.focus();
      setTimeout(() => setIsWidthAnimated(true), 0);
    }
  }, [isOpened]);

  useEffect(() => {
    if (searchParams.toString().includes("query")) {
      setSearchedTerm(searchParams.get("query")?.toString());
      setIsOpened(true);
    }
  }, [searchParams]);

  const handleChange = (term: string) => {
    setSearchedTerm(term);

    const params = new URLSearchParams(searchParams.toString());

    //Check if there is slug in params in case that search is triggered from [slug] page
    //If yes, delete it
    params.get("slug") && params.delete("slug");

    if (term) {
      params.set("query", term);
    } else {
      handleClear();
    }

    term ? router.replace(`/search?${params.toString()}`) : null;
  };

  const handleBlur = () => {
    if (!searchedTerm) {
      setIsOpened(false);
      setIsWidthAnimated(false);
    }

    return;
  };

  const handleClear = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("query");
    router.push(path);
  };

  const handleOpen = () => {
    setIsOpened(true);
    setTimeout(() => setIsWidthAnimated(true), 0);
  };

  return (
    <>
      {isOpened ? (
        <div className={classes} {...other}>
          <label htmlFor="search" className="sr-only">
            {t("searchLabel")}
          </label>

          <div className={containerClasses}>
            <Icon
              name="search"
              size="medium"
              className="text-white absolute top-1/2 -translate-y-1/2	left-2"
            />

            <input
              type="text"
              className="search__input block border border-white-200 py-[8px] pl-10 text-sm outline-0 placeholder:text-zinc-400 text-white font-light w-full"
              placeholder={`${t("searchPlaceholder")}`}
              onChange={(e) => {
                handleChange(e.target.value);
              }}
              onBlur={handleBlur}
              defaultValue={searchedTerm}
              ref={inputRef}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
            />

            <Button
              variant="ghost"
              size="small"
              shape="square"
              className={cx("absolute top-1/2 -translate-y-1/2 right-2", {
                ["block"]: searchedTerm,
                ["hidden"]: !searchedTerm,
              })}
              aria-label={`${t("searchClearLabel")}`}
              onClick={handleClear}
            >
              <Icon name="close" size="small" className="text-white" />
            </Button>
          </div>
        </div>
      ) : (
        <Button
          variant="ghost"
          size="small"
          shape="square"
          aria-label={`${t("searchLabel")}`}
          onClick={handleOpen}
        >
          <Icon name="search" size="medium" className="text-white" />
        </Button>
      )}
    </>
  );
};

export default Search;
