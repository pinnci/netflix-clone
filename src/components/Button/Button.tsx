import cx from "classnames";
import Link from "next/link";

type Button = {
  variant: "primary" | "secondary";
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
    "button",
    {
      [`button--${variant}`]: variant,
    },
    className,
  );

  return href ? (
    <Link href={href} className={classes}>
      {children}
    </Link>
  ) : (
    <button type={type} className={classes} {...other}>
      {children}
    </button>
  );
};

export default Button;
