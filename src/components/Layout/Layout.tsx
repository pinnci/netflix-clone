import cx from "classnames";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

type Layout = {
  variant: "notLoggedIn" | "loggedIn" | "registration" | "login";
  className?: string;
} & React.ComponentProps<"div">;

const Layout: React.FC<Layout> = ({
  variant,
  children,
  className,
  ...other
}) => {
  const classes = cx(
    "layout page relative",
    {
      [`layout--${variant}`]: variant,
      "min-h-screen flex flex-col":
        variant === "registration" || variant === "login",
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
