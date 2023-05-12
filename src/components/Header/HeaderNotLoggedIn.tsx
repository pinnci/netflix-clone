import cx from "classnames";

import Logo from "../Logo/Logo";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import Button from "../Button/Button";
import Container from "../Container/Container";

import { header } from "../../data/headerNotLoggedIn";

type HeaderNotLoggedIn = {
  className?: string;
} & React.ComponentProps<"header">;

const HeaderNotLoggedIn = ({ className, ...other }: HeaderNotLoggedIn) => {
  const classes = cx(
    "header header--notLoggedIn flex absolute top-0 left-0 w-full sm:px-8 md:px-8 lg:px-12",
    className,
  );

  const { loginButton } = header;

  return (
    <nav
      role="navigation"
      aria-label="Main menu"
      className="header relative z-50"
    >
      <header className={classes} {...other}>
        <Container className="flex justify-between items-center">
          <Logo />

          <div className="flex">
            <LanguageSelector className="mx-3 sm:mx-4" />
            <Button variant="primary" href={loginButton.href} size="small">
              {loginButton.title}
            </Button>
          </div>
        </Container>
      </header>
    </nav>
  );
};

export default HeaderNotLoggedIn;
