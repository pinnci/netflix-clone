import cx from "classnames";

import Container from "../Container/Container";
import Accordion from "../Accordion/Accordion";
import AccordionItem from "../Accordion/AccordionItem";

import { faq } from "../../data/homepage";
import RegistrationEmailForm from "../RegistrationEmailForm/RegistrationEmailForm";

type Faq = {
  className?: string;
} & React.ComponentProps<"div">;

const Faq = ({ className, ...other }: Faq) => {
  const classes = cx(
    "faq mt-12 px-4 pt-14 pb-12 md:pt-16 md:px-20 md:pb-16 md:mt-12 lg:pt-14 lg:px-28 lg:pb-14 lg:mt-16 xl:pt-24 xl:px-24 xl:pb-24 xl:mt-14 2xl:pt-24 2xl:px-40 2xl:pb-36 2xl:mt-16",
    className,
  );

  return (
    <Container>
      <div className={classes} {...other}>
        <div className="flex flex-col">
          <h2 className="font-bold text-3xl text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <Accordion>
            {faq.map((question, i) => {
              return (
                <AccordionItem title={question.title} key={i} index={i}>
                  {question.description}
                </AccordionItem>
              );
            })}
          </Accordion>

          <RegistrationEmailForm variant="plain" className="mt-4" />
        </div>
      </div>
    </Container>
  );
};

export default Faq;
