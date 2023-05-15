import cx from "classnames";

import Link from "next/link";

import Container from "../Container/Container";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import List from "../List/List";
import ListItem from "../ListItem/ListItem";

import { supportContact, footer } from "../../data/footerRegistration";

type FooterRegistration = {
  className?: string;
} & React.ComponentProps<"footer">;

const FooterRegistration = ({ className, ...other }: FooterRegistration) => {
  const classes = cx(
    "footer footer--registration pt-8 pb-5 lg:px-4",
    className,
  );

  const { title, href } = supportContact;

  return (
    <footer className={classes} {...other}>
      <Container>
        <p className="footer__supportContact">
          <Link href={href} className=" text-neutral-500 hover:underline">
            {title}
          </Link>
        </p>
        <div className="footer__linksContainer max-w-5xl mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:flex md:flex-row">
          {footer.map((col, index) => {
            return (
              <div className="footer__column md:w-1/4" key={index}>
                <List>
                  {col.column.map((data, i) => {
                    const { title, href } = data;

                    return (
                      <ListItem key={i} className="mt-3">
                        <Link
                          href={href}
                          className="inline-block text-sm text-neutral-500 hover:underline"
                        >
                          {title}
                        </Link>
                      </ListItem>
                    );
                  })}
                </List>
              </div>
            );
          })}
        </div>
        <div className="footer__languageSelectorContainer mt-4">
          <LanguageSelector className="inline-flex" />
        </div>
      </Container>
    </footer>
  );
};

export default FooterRegistration;
