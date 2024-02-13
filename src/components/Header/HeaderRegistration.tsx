import cx from "classnames";
import Link from "next/link";
import { useTranslation } from "next-i18next";

import Logo from "../Logo/Logo";
import Container from "../Container/Container";

type HeaderRegistration = {
  className?: string;
} & React.ComponentProps<"header">;

const HeaderRegistration = ({ className, ...other }: HeaderRegistration) => {
  const { t } = useTranslation("registration");

  const classes = cx(
    "header header--registration py-3 flex lg:px-4 lg:py-4",
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
            <Link
              href={`${t("header.button.href")}`}
              className="text-sm font-medium hover:underline md:text-base lg:text-xl"
            >
              {t("header.button.title")}
            </Link>
          </div>
        </Container>
      </header>
    </nav>
  );
};

export default HeaderRegistration;
