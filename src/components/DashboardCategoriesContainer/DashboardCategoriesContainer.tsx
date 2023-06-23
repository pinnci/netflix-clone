import cx from "classnames";
import { useTranslation } from "next-i18next";

import { requests } from "../../data/categoryRequests";

import DashboardCategoryRow from "../DashboardCategoryRow/DashboardCategoryRow";

type DashboardCategoriesContainer = {
  className?: string;
} & React.ComponentProps<"div">;

const DashboardCategoriesContainer = ({
  className,

  ...other
}: DashboardCategoriesContainer) => {
  const classes = cx("dashboardCategoryContainer relative z-20", className);

  const { t } = useTranslation("dashboard");

  return (
    <div className={classes} {...other}>
      {/**@ts-ignore */}
      {t("categories", { returnObjects: true }).map((obj) => {
        const { title, key } = obj;

        return (
          <DashboardCategoryRow
            title={title}
            fetchUrl={requests[key]}
            key={key}
            className="mb-4"
          />
        );
      })}
    </div>
  );
};

export default DashboardCategoriesContainer;
