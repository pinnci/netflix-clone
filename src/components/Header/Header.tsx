import HeaderDesktop from "./HeaderDesktop";

type Header = React.ComponentProps<"nav">;

const Header: React.FC<Header> = () => {
  return (
    <nav
      role="navigation"
      aria-label="Main menu"
      className="header relative z-50"
    >
      <HeaderDesktop />
    </nav>
  );
};

export default Header;
