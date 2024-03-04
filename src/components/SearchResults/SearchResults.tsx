import cx from "classnames";
import { useTranslation } from "next-i18next";

import DashboardMovie, {
  DashboardMovie as DashboardMovieType,
} from "../DashboardMovie/DashboardMovie";

import { MovieData } from "@/utils/utils";

type SearchResults = {
  results: [DashboardMovieType];
  searchedQuery: string;
  className?: string;
  locale: MovieData["locale"];
};

const SearchResults = ({
  results,
  searchedQuery,
  className,
  locale,
  ...other
}: SearchResults) => {
  const { t } = useTranslation("dashboard");

  const classes = cx("search-results ", className);

  let resultsWithImages;

  resultsWithImages = results.filter((movie: any) => {
    if (movie.backdrop_path !== null && movie.poster_path !== null) {
      return movie;
    }
  });

  return (
    <div className={classes} {...other}>
      {resultsWithImages.length > 0 ? (
        <div className="grid gap-2 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
          {resultsWithImages.map((result: any, i: number) => {
            return (
              <DashboardMovie
                title={result.name || result.title || result.original_title}
                id={result.id}
                posterPath={result.poster_path}
                backdropPath={result.backdrop_path}
                locale={locale}
                key={i}
                mediaType={result.media_type}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-white mx-auto max-w-2xl">
          <p>
            {`${t("searchError.searchedTerm")}`}
            {searchedQuery}
            {`${t("searchError.hasNoResults")}`}
          </p>
          <p>{`${t("searchError.recommendations")}`}</p>
          <ul className="list-disc pl-10">
            <li>{`${t("searchError.recommendation1")}`}</li>
            <li>{`${t("searchError.recommendation2")}`}</li>
            <li>{`${t("searchError.recommendation3")}`}</li>
            <li>{`${t("searchError.recommendation4")}`}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
