import { useTranslation } from "next-i18next";
import Image from "next/image";
import cx from "classnames";

import Button from "@/components/Button/Button";
import ErrorPageBg from "../../../public/images/error-page-background.png";

type ErrorPageContent = {
  className?: string;
} & React.ComponentProps<"div">;

const ErrorPageContent = ({ className, ...other }: ErrorPageContent) => {
  const { t } = useTranslation("error");

  const classes = cx(
    "error-page h-screen w-screen justify-center mx-4 text-center items-center flex flex-col",
    className,
  );

  return (
    <div className={classes} {...other}>
      <div className="fixed h-full w-full left-0 top-0">
        <Image src={ErrorPageBg} fill style={{ objectFit: "cover" }} alt="" />
      </div>

      <div className="error-page__content z-50 flex flex-col items-center justify-center max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
        <h1 className="text-white font-medium mt-0 mb-2 text-4xl z-50 sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">{`${t(
          "title",
        )}`}</h1>
        <p className="text-white mb-4 font-thin text-base z-50 sm:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">{`${t(
          "description",
        )}`}</p>
        <Button
          variant="secondary"
          href="/"
          shape="square"
          size="medium"
          className="w-fit z-50"
        >
          {`${t("buttonLabel")}`}
        </Button>
      </div>
    </div>
  );
};

export default ErrorPageContent;
