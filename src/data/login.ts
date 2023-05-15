type LoginForm = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  email: { label: string; errorMessage: string };
  password: { label: string; errorMessage: string };
  buttonLabel: string;
  checkboxLabel: string;
  helpLabel: string;
  signUp: {
    title: string;
    link: string;
    href: string;
  };
};

export const loginForm: LoginForm = {
  imageSrc: "/images/hero-banner.jpg",
  imageAlt: "Cover picture of Netflix catalogue",
  title: "Sign In",
  email: {
    label: "Email",
    errorMessage: "Please enter a valid email.",
  },
  password: {
    label: "Password",
    errorMessage: "Password is required.",
  },
  buttonLabel: "Sign In",
  checkboxLabel: "Remember me",
  helpLabel: "Need help?",
  signUp: {
    title: "New to Netflix?",
    link: "Sign up now",
    href: "/",
  },
};
