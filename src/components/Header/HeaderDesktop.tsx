import Logo from "../Logo/Logo";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import Button from "../Button/Button";
import Container from "../Container/Container";

const HeaderDesktop = () => {
  return (
    <div className="header__desktop flex absolute top-0 left-0 w-full sm:px-8 md:px-8 lg:px-12">
      <Container className="flex justify-between items-center">
        <Logo />
        <div className="flex">
          <LanguageSelector className="mx-3 sm:mx-4" />
          <Button variant="primary" href="/">
            Sign in
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default HeaderDesktop;
