type RegistrationPasswordForm = {
  title: string;
  description: string;
  emailLabel: string;
  inputLabel: string;
  forgottenPassword: { title: string; href: string };
  errorMessage: string;
  buttonTitle: string;
};

type RegistrationEmailForm = {
  title: string;
  inputLabel: string;
  errorMessage: string;
  buttonTitle: string;
};

export const registrationPasswordForm: RegistrationPasswordForm = {
  title: "Welcome back! <br/> Joining Netflix is easy.",
  description: "Enter your password and you'll be watching in no time.",
  emailLabel: "Email",
  inputLabel: "Enter your password",
  forgottenPassword: {
    title: "Forgot your password?",
    href: "#",
  },
  errorMessage: "Password should be longer that 5 characters.",
  buttonTitle: "Create account",
};

export const registrationEmailForm: RegistrationEmailForm = {
  title:
    "Ready to watch? Enter your email to create or restart your membership.",
  inputLabel: "Email adress",
  errorMessage: "Please enter a valid email address.",
  buttonTitle: "Get started",
};
