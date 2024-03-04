import cx from "classnames";
import { useTranslation } from "next-i18next";
import Link from "next/link";

import Container from "../Container/Container";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import List from "../List/List";
import ListItem from "../ListItem/ListItem";

type FooterRegistration = {
  className?: string;
} & React.ComponentProps<"footer">;

type FooterColumn = { column: { title: string; href: string } };

type FooterData = { title: string; href: string };

const FooterRegistration = ({ className, ...other }: FooterRegistration) => {
  const { t } = useTranslation("registration");

  const classes = cx(
    "footer footer--registration pt-8 pb-5 lg:px-4",
    className,
  );

  return (
    <footer className={classes} {...other}>
      <Container>
        <p className="footer__supportContact">
          <Link
            href={`${t("supportContact.phoneNumber")}`}
            className=" text-neutral-600 hover:underline"
          >
            {`${t("supportContact.title")} ${t("supportContact.phoneNumber")}`}
          </Link>
        </p>
        <div className="footer__linksContainer max-w-5xl mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:flex md:flex-row">
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
                            className="inline-block text-sm text-neutral-600 hover:underline"
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
        <div className="footer__languageSelectorContainer mt-4">
          <LanguageSelector className="inline-flex" />
        </div>
      </Container>
    </footer>
  );
};

export default FooterRegistration;
