import { useContext, useEffect, useState } from "react";
import cx from "classnames";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { firebaseClient } from "../../../firebaseClient";
import { useRouter } from "next/router";
import { PathContext } from "@/pages/_app";

import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import Container from "../Container/Container";
import Search from "../Search/Search";
import SearchMobile from "../Search/SearchMobile";
import LanguageSelector from "../LanguageSelector/LanguageSelector";

type HeaderLoggedIn = {
  className?: string;
} & React.ComponentProps<"header">;

const HeaderLoggedIn = ({ className, ...other }: HeaderLoggedIn) => {
  const [headerBackgroundColor, setHeaderBackgroundColor] =
    useState<string>("transparent");
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState<boolean>(false);

  const { t } = useTranslation("dashboard");

  const router = useRouter();

  const { path } = useContext(PathContext);

  const classes = cx(
    "header header--loggedIn flex absolute top-0 left-0 w-full",
    className,
  );

  const headerMobileMenuClasses = cx(
    "header__mobile-menu absolute top-12 left-0 w-60 bg-black flex flex-col p-6  z-10 justify-between md:hidden",
    { ["header__mobile-menu--active"]: isMobileMenuOpened },
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
      aria-label={`${t("navigationLabel")}`}
      className="header sticky top-0 z-50"
    >
      <header
        className={classes}
        style={{ backgroundColor: headerBackgroundColor }}
        {...other}
      >
        <Container className="flex justify-between items-center">
          <div className="flex items-center">
            <Button
              icon={{ name: "hamburger-menu", size: "medium" }}
              variant="ghost"
              shape="square"
              size="large"
              className="block text-white mr-5 md:hidden"
              aria-label={`${t("navigationLabel")}`}
              onClick={() => setIsMobileMenuOpened(!isMobileMenuOpened)}
            />

            <Logo className="mr-5" variant="small" href="/browse" />

            <div className="header__desktop-menu hidden md:block">
              {/**@ts-ignore */}
              {t("menu", { returnObjects: true }).map((obj, index: number) => {
                const { title, href } = obj;

                return (
                  <Link
                    href={`${href}`}
                    className={cx(
                      "text-xs lg:text-sm text-white hover:text-neutral-300 transition-all",
                      {
                        ["font-normal"]:
                          router.asPath === href || path === href,
                        ["font-thin"]: router.asPath !== href && path !== href,
                        ["ml-4"]: index !== 0,
                      },
                    )}
                    key={index}
                  >
                    {title}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end">
            <Search className="hidden md:block" />
            <SearchMobile className="block md:hidden" />

            <LanguageSelector className="hidden mx-3 sm:mx-4 md:flex" />
            <Button
              variant="primary"
              size="small"
              shape="square"
              className="hidden text-white md:block"
              onClick={async () => {
                await firebaseClient
                  .auth()
                  .signOut()
                  .then(() => {
                    router.push("/");
                  });
              }}
            >
              {t("buttonLabel")}
            </Button>
          </div>

          <div className={headerMobileMenuClasses}>
            <div className="flex flex-col">
              {/**@ts-ignore */}
              {t("menu", { returnObjects: true }).map((obj, index: number) => {
                const { title, href } = obj;

                return (
                  <Link
                    href={`${href}`}
                    className={cx(
                      "text-white hover:text-neutral-300 transition-all mb-2",
                      {
                        ["font-normal"]: router.asPath === href,
                        ["font-thin"]: router.asPath !== href,
                      },
                    )}
                    key={index}
                  >
                    {title}
                  </Link>
                );
              })}
            </div>

            <div className="flex flex-col">
              <LanguageSelector className="mb-2" size="large" />

              <Button
                variant="primary"
                size="small"
                shape="square"
                className=" text-white justify-center"
                onClick={async () => {
                  await firebaseClient
                    .auth()
                    .signOut()
                    .then(() => {
                      router.push("/");
                    });
                }}
              >
                {t("buttonLabel")}
              </Button>
            </div>
          </div>
          <div
            className={cx(
              "header__mobile-menu-overlay fixed top-12 right-0 left-0 bottom-0 bg-black/50 md:hidden",
              {
                ["header__mobile-menu-overlay--active"]: isMobileMenuOpened,
              },
            )}
            onClick={() => setIsMobileMenuOpened(false)}
          ></div>
        </Container>
      </header>
    </nav>
  );
};

export default HeaderLoggedIn;
