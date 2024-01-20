import { Layout } from "../Layout/Layout";

import HeaderNotLoggedIn from "./HeaderNotLoggedIn";
import HeaderRegistration from "./HeaderRegistration";
import HeaderLogin from "./HeaderLogin";
import HeaderLoggedIn from "./HeaderLoggedIn";
import HeaderError from "./HeaderError";

const Header = ({ variant }: Layout) => {
  return variant === "notLoggedIn" ? (
    <HeaderNotLoggedIn />
  ) : variant === "registration" ? (
    <HeaderRegistration />
  ) : variant === "login" ? (
    <HeaderLogin />
  ) : variant === "error" ? (
    <HeaderError />
  ) : (
    <HeaderLoggedIn />
  );
};

export default Header;
