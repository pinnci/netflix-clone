import cx from "classnames";
import { useTranslation } from "next-i18next";

import Logo from "../Logo/Logo";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import Button from "../Button/Button";
import Container from "../Container/Container";

type HeaderNotLoggedIn = {
  className?: string;
} & React.ComponentProps<"header">;

const HeaderNotLoggedIn = ({ className, ...other }: HeaderNotLoggedIn) => {
  const { t } = useTranslation("homepage");

  const classes = cx(
    "header header--notLoggedIn flex absolute top-0 left-0 w-full sm:px-8 md:px-8 lg:px-12",
    className,
  );

  return (
    <nav
      role="navigation"
      aria-label="Main menu"
      className="header relative z-50"
    >
      <header className={classes} {...other}>
        <Container className="flex justify-between items-center">
          <Logo href="/" />

          <div className="flex">
            <LanguageSelector className="mx-3 sm:mx-4" />
            <Button
              variant="primary"
              size="small"
              shape="square"
              className="text-white"
              //@ts-ignore
              href={t("header.button.href")}
            >
              {t("header.button.title")}
            </Button>
          </div>
        </Container>
      </header>
    </nav>
  );
};

export default HeaderNotLoggedIn;
