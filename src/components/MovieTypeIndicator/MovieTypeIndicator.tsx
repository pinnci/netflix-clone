import cx from "classnames";
import Image from "next/image";
import { useTranslation } from "next-i18next";

type MovieTypeIndicator = {
  mediaType: string;
  className?: string;
} & React.ComponentProps<"div">;

const MovieTypeIndicator = ({
  mediaType,
  className,
  ...other
}: MovieTypeIndicator) => {
  const classes = cx("flex mt-4 items-center", className);

  const { t } = useTranslation("dashboard");

  return (
    <div className={classes} {...other}>
      {Object.keys(t("media-type", { returnObjects: true })).map((key) => {
        if (mediaType === key) {
          const { title } =
            //@ts-ignore
            t("media-type", {
              returnObjects: true,
            })[key];

          return (
            <p
              className="text-base font-normal	text-white xl:text-2xl"
              key={title}
            >
              {title}
            </p>
          );
        }
      })}

      <div className="relative w-2.5 h-4 ml-2">
        <Image
          src="/images/netflix-logo.png"
          className="object-cover object-left w-auto h-full"
          alt="Netlix logo"
          width="0"
          height="0"
          sizes="100vw"
          priority
        />
      </div>
    </div>
  );
};

export default MovieTypeIndicator;
