import HeaderDesktop from "./HeaderDesktop";

type Header = {
  variant: HeaderDesktop["variant"];
} & React.ComponentProps<"nav">;

const Header: React.FC<Header> = ({ variant, ...other }) => {
  return (
    <nav
      role="navigation"
      aria-label="Main menu"
      className="header relative z-50"
      {...other}
    >
      <HeaderDesktop variant={variant} />
    </nav>
  );
};

export default Header;
