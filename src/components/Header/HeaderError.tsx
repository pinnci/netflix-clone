import cx from "classnames";
import { useTranslation } from "next-i18next";

import Logo from "../Logo/Logo";
import Container from "../Container/Container";

type HeaderError = {
  className?: string;
} & React.ComponentProps<"header">;

const HeaderError = ({ className, ...other }: HeaderError) => {
  const { t } = useTranslation("error");

  const classes = cx(
    "header header--error flex fixed top-0 left-0 w-full",
    className,
  );

  return (
    <nav
      role="navigation"
      aria-label={`${t("navigationLabel")}`}
      className="header sticky top-0 z-50"
    >
      <header className={classes} {...other}>
        <Container className="flex justify-between items-center">
          <div className="flex items-center">
            <Logo href="/browse" className="mr-6" variant="small" />
          </div>
        </Container>
      </header>
    </nav>
  );
};

export default HeaderError;
