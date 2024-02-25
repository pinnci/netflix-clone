import cx from "classnames";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef, useContext, useState } from "react";
import { PathContext } from "@/pages/_app";
import { useTranslation } from "next-i18next";
import { useDebouncedCallback } from "use-debounce";

type SearchMobile = {
  className?: string;
} & React.ComponentProps<"div">;

const SearchMobile = ({ className, ...other }: SearchMobile) => {
  const [searchedTerm, setSearchedTerm] = useState<string | undefined>("");

  const classes = cx("search__mobile relative w-full", className);

  const { t } = useTranslation("dashboard");

  const searchParams = useSearchParams();
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  const { path } = useContext(PathContext);

  useEffect(() => {
    if (searchParams.toString().includes("query")) {
      setSearchedTerm(searchParams.get("query")?.toString());
    }
  }, [searchParams]);

  const handleChange = useDebouncedCallback((term: string) => {
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
  }, 300);

  const handleClear = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("query");
    router.push(path);
  };

  return (
    <div className={classes} {...other}>
      <label htmlFor="search" className="sr-only">
        {t("searchLabel")}
      </label>

      <div className="max-w-28 sm:max-w-48">
        <input
          type="text"
          className="search__input block border border-white-200 py-[3px] pl-2 text-sm outline-0 placeholder:text-zinc-400 text-white font-light w-full"
          placeholder={`${t("searchLabel")}`}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
          defaultValue={searchedTerm}
          ref={inputRef}
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
        />
      </div>
    </div>
  );
};

export default SearchMobile;
