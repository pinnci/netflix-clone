import React, { ReactElement } from "react";
import cx from "classnames";

import CaretDown from "./Icons/CaretDown";
import Globe from "./Icons/Globe";

export const iconNamesArray = ["caret-down", "globe"] as const;

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
