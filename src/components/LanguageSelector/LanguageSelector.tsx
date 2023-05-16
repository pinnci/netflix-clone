import cx from "classnames";
import { useRouter } from "next/router";

import Icon from "../Icon/Icon";

import { languageSelector } from "../../data/languageSelector";

type LanguageSelector = {
  className?: string;
} & React.ComponentProps<"div">;

const LanguageSelector = ({ className, ...other }: LanguageSelector) => {
  const classes = cx(
    "flex items-center relative languageSelector_container",
    className,
  );

  const router = useRouter();

  const handleLocaleChange = (event: any) => {
    const value = event.target.value;

    router.push(router.route, router.asPath, {
      locale: value,
    });
  };

  return (
    <div className={classes} {...other}>
      <Icon
        name="globe"
        className="languageSelector_container__globeIcon absolute pointer-events-none"
      />
      <select
        className="languageSelector rounded w-0 pl-5 pr-8 py-1.5 sm:w-full sm:px-8"
        onChange={handleLocaleChange}
        value={router.locale}
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
        className="languageSelector_container__caretIcon absolute pointer-events-none"
      />
    </div>
  );
};

export default LanguageSelector;
