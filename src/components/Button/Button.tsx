import React from "react";
import cx from "classnames";

import Link from "next/link";
import Icon from "../Icon/Icon";

type Button = {
  variant: "primary" | "secondary" | "tertiary" | "start" | "close" | "ghost";
  shape: "rounded" | "square";
  size: "small" | "medium" | "large";
  className?: string;
  href?: string;
  icon?: {
    name: Icon["name"];
    size: Icon["size"];
    className?: Icon["className"];
  };
} & React.ComponentProps<"button">;

const Button = ({
  variant,
  shape,
  size,
  className,
  href,
  icon,
  children,
  type = "button",
  ...other
}: Button) => {
  const classes = cx(
    "button flex flex-row shrink-0 items-center",
    {
      [`button--${variant}`]: variant,
      "rounded-full p-4": shape === "rounded",
      "rounded-md": shape === "square",
      "py-1 px-4 text-sm": size === "small" && shape !== "rounded",
      "py-2 px-4 text-base": size === "medium" && shape !== "rounded",
      "py-2 px-4 text-lg sm:text-2xl sm:py-3 sm:px-6":
        size === "large" && shape !== "rounded",
    },
    className,
  );

  return href ? (
    //@ts-ignore
    <Link href={href} className={classes} {...other}>
      {icon ? (
        <Icon name={icon.name} size={icon.size} className={icon.className} />
      ) : null}
      {children}
      {variant === "start" ? <Icon name="chevron-right" /> : null}
    </Link>
  ) : (
    <button type={type} className={classes} {...other}>
      {icon ? (
        <Icon name={icon.name} size={icon.size} className={icon.className} />
      ) : null}
      {children}
      {variant === "start" ? <Icon name="chevron-right" /> : null}
    </button>
  );
};

export default Button;
