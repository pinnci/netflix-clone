import cx from "classnames";
import Container from "../Container/Container";
import RegistrationEmailForm from "../RegistrationEmailForm/RegistrationEmailForm";

type HeroBanner = {
  className?: string;
} & React.ComponentProps<"div">;

const HeroBanner = ({ className, ...other }: HeroBanner) => {
  const classes = cx("hero-banner relative z-10 pb-8 xl:pb-16", className);

  return (
    <div className={classes} {...other}>
      <div className="hero-banner__image absolute top-0 left-0 w-full"></div>
      <div className="hero-banner__gradient absolute top-0 left-0 right-0 bottom-0"></div>
      <Container>
        <div className="hero-banner__content relative pt-32 px-4 sm:px-16 md:px-20 lg:px-24 xl:pt-40 xl:px-24 2xl:pt-40">
          <h1 className="text-4xl font-black text-white mt-4 mb-0 sm:w-9/12 md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
            Unlimited movies, TV shows, and more.
          </h1>
          <p className="text-lg font-medium	text-white mt-4 xl:text-2xl">
            Watch anywhere. Cancel anytime.
          </p>

          <RegistrationEmailForm variant="bordered" className="mt-8" />
        </div>
      </Container>
    </div>
  );
};

export default HeroBanner;
