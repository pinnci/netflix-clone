import cx from "classnames";
import Image from "next/image";
import { useTranslation } from "next-i18next";

import Container from "../Container/Container";
import RegistrationEmailForm from "../RegistrationEmailForm/RegistrationEmailForm";

import { heroBanner } from "../../data/heroBanner";

type HeroBanner = {
  className?: string;
} & React.ComponentProps<"div">;

const HeroBanner = ({ className, ...other }: HeroBanner) => {
  const { t } = useTranslation("homepage");

  const classes = cx("hero-banner relative z-10 pb-8 xl:pb-16", className);

  const { imageSrc } = heroBanner;

  return (
    <div className={classes} {...other}>
      <div className="hero-banner__imageContainer absolute w-full">
        <Image
          src={imageSrc}
          className="object-cover object-left"
          alt={t("imageAlt")}
          fill
        />
      </div>
      <div className="hero-banner__gradient absolute top-0 left-0 right-0 bottom-0"></div>
      <Container className="z-20 relative">
        <div className="hero-banner__content relative pt-32 px-4 sm:px-16 md:px-20 lg:px-24 xl:pt-40 xl:px-24 2xl:pt-40">
          <h1 className="text-4xl font-black text-white mt-4 mb-0 sm:w-9/12 md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
            {t("title")}
          </h1>
          <p className="text-lg font-medium	text-white mt-4 xl:text-2xl">
            {t("subTitle")}
          </p>

          <RegistrationEmailForm variant="bordered" className="mt-8" />
        </div>
      </Container>
    </div>
  );
};

export default HeroBanner;
