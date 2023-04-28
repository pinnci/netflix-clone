import React from "react";
import cx from "classnames";

import Link from "next/link";
import Icon from "../Icon/Icon";

type Button = {
  variant: "primary" | "secondary" | "start";
  className?: string;
  href?: string;
  tag?: string | React.ReactNode;
} & React.ComponentProps<"button">;

const Button = ({
  variant,
  className,
  children,
  href,
  tag = "button",
  type = "button",
  ...other
}: Button) => {
  const classes = cx(
    "button w-max flex flex-row items-center",
    {
      [`button--${variant}`]: variant,
      "py-2 px-4 font-medium text-white rounded text-lg sm:text-2xl sm:py-3 sm:px-6":
        variant === "start",
      "py-1 px-4 font-medium text-white rounded-md text-sm":
        variant === "primary",
    },
    className,
  );

  return href ? (
    <Link href={href} className={classes}>
      {children}
      {variant === "start" ? <Icon name="chevron-right" /> : null}
    </Link>
  ) : (
    <button type={type} className={classes} {...other}>
      {children}
      {variant === "start" ? <Icon name="chevron-right" /> : null}
    </button>
  );
};

export default Button;
