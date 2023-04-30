import React, { ReactElement } from "react";
import cx from "classnames";

import CaretDown from "./Icons/CaretDown";
import Globe from "./Icons/Globe";
import Plus from "./Icons/Plus";
import ChevronRight from "./Icons/ChevronRight";
import Error from "./Icons/Error";

export const iconNamesArray = [
  "caret-down",
  "globe",
  "plus",
  "chevron-right",
  "error",
] as const;

export type IconNames = (typeof iconNamesArray)[number];

type Size = "small" | "medium" | "large";

type IconProps = {
  size?: Size;
  name: IconNames;
};

type Icon = IconProps & JSX.IntrinsicElements["svg"];

const Icon: React.FC<Icon> = ({ className, size, name, ...other }: Icon) => {
  const classes = cx(
    {
      [`icon`]: true,
      [`icon--${size}`]: size,
    },
    className,
  );

  function getIcon(iconName: Icon["name"]): ReactElement {
    switch (iconName) {
      case "caret-down":
        return <CaretDown />;
      case "globe":
        return <Globe />;
      case "plus":
        return <Plus />;
      case "chevron-right":
        return <ChevronRight />;
      case "error":
        return <Error />;
      default:
        return <svg />;
    }
  }

  return React.cloneElement(getIcon(name), {
    className: classes,
    ...other,
  });
};

export default Icon;
