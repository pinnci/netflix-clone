import { useEffect, useState } from "react";
import cx from "classnames";
import Link from "next/link";
import { useTranslation } from "next-i18next";

import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import Container from "../Container/Container";
import Search from "../Search/Search";

import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import LanguageSelector from "../LanguageSelector/LanguageSelector";

type HeaderLoggedIn = {
  className?: string;
} & React.ComponentProps<"header">;

const HeaderLoggedIn = ({ className, ...other }: HeaderLoggedIn) => {
  const [headerBackgroundColor, setHeaderBackgroundColor] =
    useState<string>("transparent");

  const { t } = useTranslation("dashboard");

  const router = useRouter();

  const classes = cx(
    "header header--loggedIn flex absolute top-0 left-0 w-full",
    className,
  );

  const handleBackgroundChange = () => {
    if (window.scrollY > 100) {
      setHeaderBackgroundColor("black");
    } else {
      setHeaderBackgroundColor("transparent");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleBackgroundChange);

    return () => {
      window.removeEventListener("scroll", handleBackgroundChange);
    };
  }, []);

  return (
    <nav
      role="navigation"
      aria-label="Main menu"
      className="header sticky top-0 z-50"
    >
      <header
        className={classes}
        style={{ backgroundColor: headerBackgroundColor }}
        {...other}
      >
        <Container className="flex justify-between items-center">
          <div className="flex items-center">
            <Logo className="mr-6" variant="small" href="/browse" />

            {/**@ts-ignore */}
            {t("menu", { returnObjects: true }).map((obj, index: number) => {
              const { title, href } = obj;

              return (
                <Link
                  href={`${href}`}
                  className="ml-4 text-white hover:text-neutral-300 transition-all"
                  key={index}
                >
                  {title}
                </Link>
              );
            })}
          </div>

          <div className="flex justify-end">
            <Search />
            <LanguageSelector className="mx-3 sm:mx-4" />
            <Button
              variant="primary"
              size="small"
              shape="square"
              className="text-white"
              onClick={() => {
                router.push("/");
                signOut(auth);
              }}
            >
              {t("buttonLabel")}
            </Button>
          </div>
        </Container>
      </header>
    </nav>
  );
};

export default HeaderLoggedIn;
