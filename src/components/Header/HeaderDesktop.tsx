import Logo from "../Logo/Logo";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import Button from "../Button/Button";
import Container from "../Container/Container";

const HeaderDesktop = () => {
  return (
    <div className="header__desktop flex">
      <Container className="flex justify-between items-center">
        <Logo />
        <div className="flex">
          <LanguageSelector />
          <Button
            variant="primary"
            className="py-1 px-4 text-sm text-white font-medium rounded-md inline-flex items-center"
            href="/"
          >
            Sign in
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default HeaderDesktop;
