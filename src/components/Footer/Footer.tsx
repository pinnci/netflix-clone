import { Layout } from "../Layout/Layout";

import FooterNotLoggedIn from "./FooterNotLoggedIn";
import FooterRegistration from "./FooterRegistration";
import FooterLogin from "./FooterLogin";
import FooterLoggedIn from "./FooterLoggedIn";

const Footer = ({ variant }: Layout) => {
  return variant === "notLoggedIn" ? (
    <FooterNotLoggedIn />
  ) : variant === "registration" ? (
    <FooterRegistration />
  ) : variant === "login" ? (
    <FooterLogin />
  ) : variant === "error" ? null : (
    <FooterLoggedIn />
  );
};

export default Footer;
