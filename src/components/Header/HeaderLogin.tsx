import cx from "classnames";
import { useTranslation } from "next-i18next";

import Logo from "../Logo/Logo";
import Container from "../Container/Container";

type HeaderLogin = {
  className?: string;
} & React.ComponentProps<"header">;

const HeaderLogin = ({ className, ...other }: HeaderLogin) => {
  const { t } = useTranslation("login");

  const classes = cx(
    "header header--login flex absolute top-0 left-0 w-full sm:px-8 md:px-8 lg:px-12",
    className,
  );

  return (
    <nav
      role="navigation"
      aria-label={`${t("navigationLabel")}`}
      className="header relative z-50"
    >
      <header className={classes} {...other}>
        <Container className="flex justify-between items-center">
          <Logo href="/" />
        </Container>
      </header>
    </nav>
  );
};

export default HeaderLogin;
