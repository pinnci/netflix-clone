import React, { ReactElement } from "react";
import cx from "classnames";

import CaretDown from "./Icons/CaretDown";
import Globe from "./Icons/Globe";
import Plus from "./Icons/Plus";
import ChevronRight from "./Icons/ChevronRight";
import Error from "./Icons/Error";
import Menu from "./Icons/Menu";
import Play from "./Icons/Play";
import Close from "./Icons/Close";
import Info from "./Icons/Info";
import Facebook from "./Icons/Facebook";
import Instagram from "./Icons/Instagram";
import Youtube from "./Icons/Youtube";

export const iconNamesArray = [
  "caret-down",
  "globe",
  "plus",
  "chevron-right",
  "error",
  "menu",
  "play",
  "close",
  "info",
  "facebook",
  "instagram",
  "youtube",
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
    "icon fill-current block",
    {
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
      case "menu":
        return <Menu />;
      case "play":
        return <Play />;
      case "close":
        return <Close />;
      case "info":
        return <Info />;
      case "facebook":
        return <Facebook />;
      case "instagram":
        return <Instagram />;
      case "youtube":
        return <Youtube />;
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
