import cx from "classnames";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useId } from "react";

import Icon from "../Icon/Icon";

import { languageSelector } from "../../data/languageSelector";

type LanguageSelector = {
  className?: string;
  size?: "small" | "large" | "automatic";
} & React.ComponentProps<"div">;

const LanguageSelector = ({
  className,
  size = "automatic",
  ...other
}: LanguageSelector) => {
  const classes = cx(
    "flex items-center relative languageSelector_container shrink-0",
    className,
  );

  const id = useId();

  const router = useRouter();

  const { t } = useTranslation("dashboard");

  const { pathname, asPath, query } = router;

  const handleLocaleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    router.push({ pathname, query }, asPath, { locale: value });
  };

  return (
    <div className={classes} {...other}>
      <Icon name="globe" className="left-2 absolute pointer-events-none" />

      <label htmlFor={id} className="invisible w-0">
        {`${t("languageSelectorLabel")}`}
      </label>

      <select
        className={cx("languageSelector appearance-none rounded px-7 py-1.5", {
          ["w-full"]: size === "large",
          ["w-0 sm:w-full sm:px-8"]: size === "automatic",
          ["w-12"]: size === "small",
        })}
        onChange={handleLocaleChange}
        value={router.locale}
        name="languageSelector"
        id={id}
        aria-label={`${t("languageSelectorLabel")}`}
      >
        {languageSelector.map((language, index) => {
          return (
            <option
              key={index}
              lang={language.lang}
              value={language.value}
              label={language.title}
            >
              {language.title}
            </option>
          );
        })}
      </select>
      <Icon
        name="caret-down"
        className={cx(
          "languageSelector_container__caretIcon right-2 absolute pointer-events-none",
          {
            ["sm:right-3"]: size === "automatic",
            ["left-8"]: size === "small",
          },
        )}
      />
    </div>
  );
};

export default LanguageSelector;
