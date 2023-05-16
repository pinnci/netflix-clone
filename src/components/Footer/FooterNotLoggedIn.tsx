import cx from "classnames";
import Link from "next/link";
import { useTranslation } from "next-i18next";

import Container from "../Container/Container";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import List from "../List/List";
import ListItem from "../ListItem/ListItem";

type FooterNotLoggedIn = {
  className?: string;
} & React.ComponentProps<"footer">;

type FooterColumn = { column: { title: string; href: string } };

type FooterData = { title: string; href: string };

const FooterNotLoggedIn = ({ className, ...other }: FooterNotLoggedIn) => {
  const { t } = useTranslation("homepage");

  const classes = cx(
    "footer flex flex-col footer--notLoggedIn mt-6 px-4 pt-14 pb-12 md:pt-16 md:px-20 md:pb-16 lg:pt-14 lg:px-28 lg:pb-14 xl:pt-24 xl:px-24 xl:pb-24 2xl:pt-24 2xl:px-40 2xl:pb-36",
    className,
  );

  return (
    <Container>
      <footer className={classes} {...other}>
        <p className="footer__supportContact">
          {t("supportContact.title")}{" "}
          <span>
            <Link
              href={`tel:${t("supportContact.phoneNumber")}`}
              className="underline"
            >
              {t("supportContact.phoneNumber")}
            </Link>
          </span>
        </p>
        <div className="footer__linksContainer mt-9 grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {/**@ts-ignore */}
          {t("footer", { returnObjects: true }).map(
            ({ column }: FooterColumn, index: number) => {
              return (
                <div className="footer__column" key={index}>
                  <List>
                    {/**@ts-ignore */}
                    {column.map((data: FooterData, i: number) => {
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
            },
          )}
        </div>
        <div className="footer__languageSelectorContainer mt-9">
          <LanguageSelector className="inline-flex" />
        </div>
      </footer>
    </Container>
  );
};

export default FooterNotLoggedIn;
