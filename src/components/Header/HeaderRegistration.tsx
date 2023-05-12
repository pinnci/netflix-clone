import cx from "classnames";
import Link from "next/link";

import Logo from "../Logo/Logo";
import Container from "../Container/Container";

import { header } from "../../data/headerNotLoggedIn";

type HeaderRegistration = {
  className?: string;
} & React.ComponentProps<"header">;

const HeaderRegistration = ({ className, ...other }: HeaderRegistration) => {
  const classes = cx(
    "header header--registration py-3 flex lg:px-4 lg:py-4",
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
            <Link
              href={loginButton.href}
              className="text-sm font-medium hover:underline md:text-base lg:text-xl"
            >
              {loginButton.title}
            </Link>
          </div>
        </Container>
      </header>
    </nav>
  );
};

export default HeaderRegistration;
