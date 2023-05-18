import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import cx from "classnames";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { addEmail } from "../../../slices/registrationEmailSlice";
import { AppState } from "../../../store";

import Container from "../Container/Container";
import Input from "../Input/Input";
import Button from "../Button/Button";

type RegistrationPasswordForm = {
  className?: string;
} & React.ComponentProps<"form">;

const RegistrationPasswordForm = ({
  className,
  ...other
}: RegistrationPasswordForm) => {
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordInputValue, setPasswordInputValue] = useState<string>("");
  const [passwordInputField, setPasswordInputField] =
    useState<HTMLInputElement | null>(null);

  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailInputValue, setEmailInputValue] = useState<string>("");
  const [emailInputField, setEmailInputField] =
    useState<HTMLInputElement | null>(null);

  const { t } = useTranslation("registration");

  const dispatch = useDispatch();

  const router = useRouter();

  const registrationEmail = useSelector(
    (state: AppState) => state.registrationEmail.value,
  );

  const classes = cx(
    "registrationPasswordForm flex justify-center mt-5",
    className,
  );

  //PASSWORD INPUT
  const passwordInputRef = useRef(null);

  const checkPassword = () => {
    if (passwordInputValue.length > 6) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }

    if (passwordInputValue === "") setPasswordError(false);
  };

  const handlePasswordInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPasswordInputValue(e.target.value);

    if (passwordError) {
      checkPassword();
    }

    if (e.target.value === "") {
      setPasswordError(false);
    }
  };

  const handlePasswordInputFocus = () => {
    if (passwordError && passwordInputValue) {
      checkPassword();
    }
  };

  const handlePasswordInputBlur = () => {
    if (passwordInputValue) {
      checkPassword();
    }
  };

  const focusPasswordInput = () => {
    passwordInputField && passwordInputField.focus();
  };

  //EMAIL INPUT
  const emailInputRef = useRef(null);

  const checkEmailRegex = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!emailRegex.test(emailInputValue)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (emailInputValue === "") setEmailError(false);
  };

  const handleEmailInputFocus = () => {
    if (emailError && emailInputValue) {
      checkEmailRegex();
    }
  };

  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInputValue(e.target.value);

    if (emailError) {
      checkEmailRegex();
    }

    if (e.target.value === "") {
      setEmailError(false);
    }
  };

  const handleEmailInputBlur = () => {
    if (emailInputValue) {
      checkEmailRegex();
    }
  };

  const focusEmailInput = () => {
    emailInputField && emailInputField.focus();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!passwordInputValue && !passwordError && !emailInputField) {
      focusPasswordInput();
    }

    if (
      !passwordInputValue &&
      !passwordError &&
      !emailInputValue &&
      !emailError
    ) {
      focusEmailInput();
    }

    if (!passwordError && passwordInputValue) {
      createUserWithEmailAndPassword(
        auth,
        registrationEmail ? registrationEmail : emailInputValue,
        passwordInputValue,
      )
        .then((userCredential) => {
          // Account created
          const user = userCredential.user;
          console.log(userCredential);
          console.log(user);

          localStorage.removeItem("registration-email");
          // ...
          //TO DO - AUMATICALLY LOG USER IN
          //TODO : AFTER LOG IN, REDIRECT TO HOMEPAGE WHERE CHECK IF USER IS LOGGED. IF YES, SHOW DASHBOARD. IF NOT, SHOW NOT LOGGED IN PAGE

          router.push("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          // ..
        });
    }
  };

  useEffect(() => {
    setPasswordInputField(passwordInputRef.current);
    setEmailInputField(emailInputRef.current);

    if (!registrationEmail) {
      const localStorageRegistrationEmail =
        localStorage.getItem("registration-email");

      if (localStorageRegistrationEmail)
        dispatch(addEmail(localStorageRegistrationEmail));
    }
  }, [dispatch, registrationEmail]);

  return (
    <Container className="grow pb-40">
      <div className="pt-8 pb-16">
        <form className={classes} {...other} onSubmit={handleSubmit}>
          <div className="max-w-md">
            <h1
              dangerouslySetInnerHTML={{
                __html: registrationEmail
                  ? `${t("title")}`
                  : `${t("registration.title")}`,
              }}
              className="text-3xl font-medium"
            />

            <p
              className="text-lg"
              dangerouslySetInnerHTML={{
                __html: registrationEmail
                  ? `${t("description")}`
                  : `${t("registration.description")}`,
              }}
            />

            <div className="mt-4 mb-8">
              {registrationEmail ? (
                <>
                  <p className="text-base">{t("emailLabel")}</p>
                  <p className="text-base font-medium mb-4">
                    {registrationEmail}
                  </p>
                </>
              ) : null}

              {registrationEmail ? (
                <Input
                  label={t("passwordInput.label")}
                  type="password"
                  errorMessage={t("passwordInput.errorMessage")}
                  onChange={(e) => handlePasswordInputChange(e)}
                  onBlur={handlePasswordInputBlur}
                  onFocus={handlePasswordInputFocus}
                  ref={passwordInputRef}
                  error={passwordError}
                  variant="light"
                />
              ) : (
                <>
                  <Input
                    label={t("registrationEmailInput.label")}
                    type="email"
                    errorMessage={t("registrationEmailInput.errorMessage")}
                    onChange={(e) => handleEmailInputChange(e)}
                    onBlur={handleEmailInputBlur}
                    onFocus={handleEmailInputFocus}
                    ref={emailInputRef}
                    error={emailError}
                    variant="light"
                    inputContainerClassName="mb-6"
                  />

                  <Input
                    label={t("passwordInput.label")}
                    type="password"
                    errorMessage={t("passwordInput.errorMessage")}
                    onChange={(e) => handlePasswordInputChange(e)}
                    onBlur={handlePasswordInputBlur}
                    onFocus={handlePasswordInputFocus}
                    ref={passwordInputRef}
                    error={passwordError}
                    variant="light"
                  />
                </>
              )}
            </div>

            {registrationEmail ? (
              <Link
                href={`${t("forgottenPassword.href")}`}
                className="text-blue-500 block mb-6 hover:underline"
              >
                {t("forgottenPassword.title")}
              </Link>
            ) : null}

            <Button
              size="large"
              type="submit"
              variant="primary"
              className="w-full text-2xl font-light justify-center"
            >
              {t("buttonTitle")}
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default RegistrationPasswordForm;
