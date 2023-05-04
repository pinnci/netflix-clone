import FooterNotLoggedIn from "./FooterNotLoggedIn";
import FooterRegistration from "./FooterRegistration";

export type Footer = {
  variant: "notLoggedIn" | "loggedIn" | "registration";
};

const Footer = ({ variant }: Footer) => {
  return variant === "notLoggedIn" ? (
    <FooterNotLoggedIn />
  ) : variant === "registration" ? (
    <FooterRegistration />
  ) : null;
};

export default Footer;
