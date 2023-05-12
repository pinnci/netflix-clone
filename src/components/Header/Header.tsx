import HeaderNotLoggedIn from "./HeaderNotLoggedIn";
import HeaderRegistration from "./HeaderRegistration";
import HeaderLogin from "./HeaderLogin";

export type Header = {
  variant: "notLoggedIn" | "loggedIn" | "registration" | "login";
};

const Header = ({ variant }: Header) => {
  return variant === "notLoggedIn" ? (
    <HeaderNotLoggedIn />
  ) : variant === "registration" ? (
    <HeaderRegistration />
  ) : variant === "login" ? (
    <HeaderLogin />
  ) : null;
};

export default Header;
