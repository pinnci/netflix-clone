import cx from "classnames";
import { useTranslation } from "next-i18next";

import DashboardCategoryRow from "../DashboardCategoryRow/DashboardCategoryRow";

import { MovieData } from "@/utils/utils";

type DashboardCategoriesContainer = {
  className?: string;
  data: {
    [key: string]: [
      {
        name?: MovieData["name"];
        title?: MovieData["title"];
        original_title: MovieData["originalTitle"];
        id: MovieData["id"];
        poster_path: MovieData["posterPath"];
        backdrop_path: MovieData["backdropPath"];
        media_type: MovieData["mediaType"];
      },
    ];
  };
  locale: MovieData["locale"];
} & React.ComponentProps<"div">;

const DashboardCategoriesContainer = ({
  locale,
  className,
  data,
  ...other
}: DashboardCategoriesContainer) => {
  const classes = cx("dashboard-categories-container relative z-20", className);

  const { t } = useTranslation("dashboard");

  return (
    <div className={classes} {...other}>
      {/**@ts-ignore */}
      {t("categories", { returnObjects: true }).map(
        (obj: { title: string; key: string }) => {
          const { title, key } = obj;

          return (
            <DashboardCategoryRow
              title={title}
              data={data[key]}
              key={key}
              className="mb-4"
              locale={locale}
            />
          );
        },
      )}
    </div>
  );
};

export default DashboardCategoriesContainer;
