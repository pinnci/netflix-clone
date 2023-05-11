import cx from "classnames";
import Link from "next/link";

import Logo from "../Logo/Logo";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import Button from "../Button/Button";
import Container from "../Container/Container";

type HeaderDesktop = {
  variant: "notLoggedIn" | "loggedIn" | "registration" | "login";
  className?: string;
} & React.ComponentProps<"header">;

const HeaderDesktop = ({ variant, className, ...other }: HeaderDesktop) => {
  const classes = cx(
    "header__desktop",
    {
      "header__desktop--notLoggedIn flex absolute top-0 left-0 w-full sm:px-8 md:px-8 lg:px-12":
        variant === "notLoggedIn" || variant === "login",
      "header__desktop--registration py-3 flex lg:px-4 lg:py-4":
        variant === "registration",
    },
    className,
  );

  return (
    <header className={classes} {...other}>
      <Container className="flex justify-between items-center">
        <Logo />

        {
          variant === "notLoggedIn" ? (
            <div className="flex">
              <LanguageSelector className="mx-3 sm:mx-4" />
              <Button variant="primary" href="/login" size="small">
                Sign In
              </Button>
            </div>
          ) : variant === "registration" ? (
            <div className="flex">
              <Link
                href="/login"
                className="text-sm font-medium hover:underline md:text-base lg:text-xl"
              >
                Sign In
              </Link>
            </div>
          ) : variant === "login" ? null : null /**logged in header here */
        }
      </Container>
    </header>
  );
};

export default HeaderDesktop;
