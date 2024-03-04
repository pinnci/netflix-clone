import cx from "classnames";
import { useTranslation } from "next-i18next";
import Link from "next/link";

import Container from "../Container/Container";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import List from "../List/List";
import ListItem from "../ListItem/ListItem";
import Icon from "../Icon/Icon";

type FooterLoggedIn = {
  className?: string;
} & React.ComponentProps<"footer">;

type FooterColumn = { column: { title: string; href: string } };

type FooterData = { title: string; href: string };

const FooterLoggedIn = ({ className, ...other }: FooterLoggedIn) => {
  const { t } = useTranslation("dashboard");

  const classes = cx(
    "footer footer--logged-in relative z-20 w-full pt-8 pb-5 lg:px-4",
    className,
  );

  return (
    <footer className={classes} {...other}>
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="footer--logged-in__socials-container flex items-center">
            <Link
              href="https://www.facebook.com/Netflix/"
              aria-label="Facebook"
              target="_blank"
              className="mr-8"
            >
              <Icon name="facebook" className="text-white" size="medium" />
            </Link>

            <Link
              href="https://www.instagram.com/Netflix"
              aria-label="Instagram"
              target="_blank"
              className="mr-8"
            >
              <Icon name="instagram" className="text-white" size="medium" />
            </Link>

            <Link
              href="https://www.youtube.com/channel/UCNG0bMYut0wL3C9BS5ffQXw"
              aria-label="Youtube"
              target="_blank"
            >
              <Icon name="youtube" className="text-white" size="medium" />
            </Link>
          </div>

          <div className="footer__linksContainer grid grid-cols-2 sm:gap-4 sm:grid-cols-3 md:flex md:flex-row">
            {/**@ts-ignore */}
            {t("footer", { returnObjects: true }).map(
              ({ column }: FooterColumn, index: number) => {
                return (
                  <div className="footer__column md:w-1/4" key={index}>
                    <List>
                      {/**@ts-ignore */}
                      {column.map((data: FooterData, i: number) => {
                        const { title, href } = data;

                        return (
                          <ListItem key={i} className="mt-3">
                            <Link
                              href={href}
                              className="inline-block text-sm text-neutral-300 hover:underline"
                            >
                              {title}
                            </Link>
                          </ListItem>
                        );
                      })}
                    </List>
                  </div>
                );
              },
            )}
          </div>
          <div className="footer__languageSelectorContainer my-6">
            <LanguageSelector className="inline-flex" />
          </div>

          <p className="text-sm text-neutral-300">
            © 1997-2023 Netflix, Inc. | {`${t("replicationTitle")}`}{" "}
            <Link
              href="https://www.linkedin.com/in/d%C3%A1vid-kop%C3%A1%C4%8Dik-3322401b9/"
              target="_blank"
              className="inline-block hover:underline"
            >
              Dávid Kopáčik
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default FooterLoggedIn;
