import cx from "classnames";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export type Layout = {
  variant: "notLoggedIn" | "loggedIn" | "registration" | "login" | "error";
  className?: string;
} & React.ComponentProps<"div">;

const Layout: React.FC<Layout> = ({
  variant,
  children,
  className,
  ...other
}) => {
  const classes = cx(
    {
      [`layout--${variant}`]: variant,
      relative: variant !== "error",
      "min-h-screen flex flex-col":
        variant === "registration" || variant === "login",
      "fixed top-0 right-0 bottom-0 left-0 flex": variant === "error",
    },
    className,
  );

  return (
    <div className={classes} {...other}>
      <Header variant={variant} />
      {children}
      <Footer variant={variant} />
    </div>
  );
};

export default Layout;
