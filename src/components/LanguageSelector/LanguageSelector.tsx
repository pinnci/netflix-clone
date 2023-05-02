import cx from "classnames";

import Icon from "../Icon/Icon";

type LanguageSelector = {
  className?: string;
} & React.ComponentProps<"div">;

const LanguageSelector = ({ className, ...other }: LanguageSelector) => {
  const classes = cx(
    "flex items-center relative languageSelector_container",
    className,
  );

  return (
    <div className={classes} {...other}>
      <Icon
        name="globe"
        className="languageSelector_container__globeIcon absolute pointer-events-none"
      />
      <select className="languageSelector rounded w-0 pl-5 pr-8 py-1.5 sm:w-full sm:px-8">
        <option>English</option>
        <option>Čestina</option>
      </select>
      <Icon
        name="caret-down"
        className="languageSelector_container__caretIcon absolute pointer-events-none"
      />
    </div>
  );
};

export default LanguageSelector;
