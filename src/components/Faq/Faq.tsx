import cx from "classnames";
import { useTranslation } from "next-i18next";

import Container from "../Container/Container";
import Accordion from "../Accordion/Accordion";
import AccordionItem from "../Accordion/AccordionItem";

import RegistrationEmailForm from "../RegistrationEmailForm/RegistrationEmailForm";

type Faq = {
  className?: string;
} & React.ComponentProps<"div">;

type FaqItems = {
  title: string;
  description: string;
};

const Faq = ({ className, ...other }: Faq) => {
  const { t } = useTranslation("homepage");

  const classes = cx(
    "faq mt-12 px-4 pt-14 pb-12 md:pt-16 md:px-20 md:pb-16 md:mt-12 lg:pt-14 lg:px-28 lg:pb-14 lg:mt-16 xl:pt-24 xl:px-24 xl:pb-24 xl:mt-14 2xl:pt-24 2xl:px-40 2xl:pb-36 2xl:mt-16",
    className,
  );

  return (
    <Container>
      <div className={classes} {...other}>
        <div className="flex flex-col">
          <h2 className="font-bold text-3xl text-white sm:text-4xl">
            {t("faqTitle")}
          </h2>
          <Accordion>
            {/**@ts-ignore */}
            {t("faqs", { returnObjects: true }).map(
              ({ title, description }: FaqItems, i: number) => {
                return (
                  <AccordionItem title={title} key={i} index={i}>
                    {description}
                  </AccordionItem>
                );
              },
            )}
          </Accordion>

          <RegistrationEmailForm variant="plain" className="mt-4" />
        </div>
      </div>
    </Container>
  );
};

export default Faq;
