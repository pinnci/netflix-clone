import FooterNotLoggedIn from "./FooterNotLoggedIn";
import FooterRegistration from "./FooterRegistration";
import FooterLogin from "./FooterLogin";

export type Footer = {
  variant: "notLoggedIn" | "loggedIn" | "registration" | "login";
};

const Footer = ({ variant }: Footer) => {
  return variant === "notLoggedIn" ? (
    <FooterNotLoggedIn />
  ) : variant === "registration" ? (
    <FooterRegistration />
  ) : variant === "login" ? (
    <FooterLogin />
  ) : null;
};

export default Footer;
