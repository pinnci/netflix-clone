import cx from "classnames";
import { useTranslation } from "next-i18next";
import Link from "next/link";

import Container from "../Container/Container";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import List from "../List/List";
import ListItem from "../ListItem/ListItem";
import Divider from "../Divider/Divider";

type FooterLogin = {
  className?: string;
} & React.ComponentProps<"footer">;

type FooterColumn = { column: { title: string; href: string } };

type FooterData = { title: string; href: string };

const FooterLogin = ({ className, ...other }: FooterLogin) => {
  const { t } = useTranslation("login");

  const classes = cx(
    "footer footer--login relative z-20 w-full pt-8 pb-5 lg:px-4",
    className,
  );

  return (
    <footer className={classes} {...other}>
      <Divider className="block sm:hidden mb-4" />
      <Container>
        <div className="max-w-5xl mx-auto">
          <p className="footer__supportContact">
            <Link
              href={`${t("supportContact.href")}`}
              className=" text-neutral-300 hover:underline"
            >
              {t("supportContact.title")}
            </Link>
          </p>
          <div className="footer__linksContainer mt-6 grid grid-cols-2 sm:gap-4 sm:grid-cols-3 md:flex md:flex-row">
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
          <div className="footer__languageSelectorContainer mt-10">
            <LanguageSelector className="inline-flex" />
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default FooterLogin;
