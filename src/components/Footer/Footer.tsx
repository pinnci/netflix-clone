import cx from "classnames";
import Link from "next/link";

import Container from "../Container/Container";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import List from "../List/List";
import ListItem from "../ListItem/ListItem";

import {
  supportContact,
  firstColumn,
  secondColumn,
  thirdColumn,
  fourthColumn,
} from "@/data/footer";

type Footer = {
  className?: string;
} & React.ComponentProps<"footer">;

const Footer = ({ className, ...other }: Footer) => {
  const classes = cx(
    "footer flex flex-col mt-6 px-4 pt-14 pb-12 md:pt-16 md:px-20 md:pb-16 lg:pt-14 lg:px-28 lg:pb-14 xl:pt-24 xl:px-24 xl:pb-24 2xl:pt-24 2xl:px-40 2xl:pb-36",
    className,
  );

  const { title, phoneNumber } = supportContact;

  return (
    <Container>
      <footer className={classes} {...other}>
        <p className="footer__supportContact">
          {title}{" "}
          <span>
            <Link href={`tel:${phoneNumber}`} className="underline">
              {phoneNumber}
            </Link>
          </span>
        </p>

        <div className="footer__linksContainer mt-9 grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <div className="footer__column">
            <List>
              {firstColumn.map((data, i) => {
                const { title, href } = data;

                return (
                  <ListItem key={i} className="mt-3">
                    <Link
                      href={href}
                      className="underline inline-block text-sm"
                    >
                      {title}
                    </Link>
                  </ListItem>
                );
              })}
            </List>
          </div>

          <div className="footer__column">
            <List>
              {secondColumn.map((data, i) => {
                const { title, href } = data;

                return (
                  <ListItem key={i} className="mt-3">
                    <Link
                      href={href}
                      className="underline inline-block text-sm"
                    >
                      {title}
                    </Link>
                  </ListItem>
                );
              })}
            </List>
          </div>

          <div className="footer__column">
            <List>
              {thirdColumn.map((data, i) => {
                const { title, href } = data;

                return (
                  <ListItem key={i} className="mt-3">
                    <Link
                      href={href}
                      className="underline inline-block text-sm"
                    >
                      {title}
                    </Link>
                  </ListItem>
                );
              })}
            </List>
          </div>

          <div className="footer__column">
            <List>
              {fourthColumn.map((data, i) => {
                const { title, href } = data;

                return (
                  <ListItem key={i} className="mt-3">
                    <Link
                      href={href}
                      className="underline inline-block text-sm"
                    >
                      {title}
                    </Link>
                  </ListItem>
                );
              })}
            </List>
          </div>
        </div>

        <div className="footer__languageSelectorContainer mt-9">
          <LanguageSelector className="inline-flex" />
        </div>
      </footer>
    </Container>
  );
};

export default Footer;
