import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import cx from "classnames";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { firebaseClient } from "../../../firebaseClient";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";

import Container from "../Container/Container";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Toast from "../Toast/Toast";
import { MovieData } from "@/utils/utils";

type RegistrationPasswordForm = {
  className?: string;
  locale: MovieData["locale"];
} & React.ComponentProps<"form">;

const RegistrationPasswordForm = ({
  className,
  locale,
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

  const [firebaseErrorCode, setFirebaseErrorCode] = useState<string | null>(
    null,
  );
  const [reCaptchaValue, setReCaptchaValue] = useState<string | null>(null);
  const [reCaptchaError, setReCaptchaError] = useState<string | null>(null);

  const { t } = useTranslation("registration");

  const router = useRouter();

  const formRef = useRef(null);
  const captchaRef = useRef(null);

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

  const clearLocalStorageRegistrationEmail = () => {
    localStorage.removeItem("registration-email");
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

    if (!reCaptchaValue) {
      setReCaptchaError("The g-recaptcha-response parameter not found");
    } else {
      setReCaptchaError("");
    }

    if (!passwordError && passwordInputValue && reCaptchaValue) {
      firebaseClient
        .auth()
        .createUserWithEmailAndPassword(emailInputValue, passwordInputValue)
        .then((userCredential) => {
          // Account created
          const user = userCredential.user;
          console.log(userCredential);
          console.log(user);

          clearLocalStorageRegistrationEmail();

          router.push("/");

          //Send confirmation dummy e-mail
          emailjs.send(
            //@ts-ignore
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
            {
              email: emailInputValue,
            },
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
          );
        })
        .catch((error) => {
          setFirebaseErrorCode(error.code);
        });
    }
  };

  useEffect(() => {
    setPasswordInputField(passwordInputRef.current);
    setEmailInputField(emailInputRef.current);

    if (!emailInputValue) {
      const localStorageRegistrationEmail =
        localStorage.getItem("registration-email");

      if (localStorageRegistrationEmail)
        setEmailInputValue(localStorageRegistrationEmail);
    }
  }, [emailInputValue]);

  return (
    <Container className="grow pb-40">
      <div className="pt-8 pb-16">
        <form
          className={classes}
          onSubmit={handleSubmit}
          ref={formRef}
          {...other}
        >
          <div className="max-w-md">
            <h1
              dangerouslySetInnerHTML={{
                __html: emailInputValue
                  ? `${t("title")}`
                  : `${t("registration.title")}`,
              }}
              className="text-3xl font-medium"
            />

            <p
              className="text-lg"
              dangerouslySetInnerHTML={{
                __html: emailInputValue
                  ? `${t("description")}`
                  : `${t("registration.description")}`,
              }}
            />

            {firebaseErrorCode && (
              <Toast className="my-4">
                {Object.keys(t("errorMessages", { returnObjects: true })).map(
                  (key) => {
                    let errorMessageElement;

                    if (firebaseErrorCode === key) {
                      const {
                        errorMessage,
                        errorMessageLinkTitle,
                        errorMessageLinkHref,
                      } =
                        //@ts-ignore
                        t("errorMessages", {
                          returnObjects: true,
                        })[key];

                      errorMessageElement = (
                        <div key={key}>
                          <span className="text-white text-sm">
                            {errorMessage}
                          </span>{" "}
                          {errorMessageLinkTitle && (
                            <Link
                              href={errorMessageLinkHref}
                              className="text-white text-sm underline"
                              onClick={clearLocalStorageRegistrationEmail}
                            >
                              {errorMessageLinkTitle}
                              {"."}
                            </Link>
                          )}
                        </div>
                      );

                      return errorMessageElement;
                    }
                  },
                )}
              </Toast>
            )}

            <div className="mt-4 mb-8">
              {emailInputValue ? (
                <>
                  <p className="text-base">{t("emailLabel")}</p>
                  <p className="text-base font-medium mb-4">
                    {emailInputValue}
                  </p>
                </>
              ) : null}

              {emailInputValue ? (
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

            {emailInputValue ? (
              <Link
                href={`${t("forgottenPassword.href")}`}
                className="text-blue-600 inline-block mb-6 hover:underline"
              >
                {t("forgottenPassword.title")}
              </Link>
            ) : null}

            <div className="mb-6">
              <ReCAPTCHA
                sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_KEY}`}
                onChange={(value: string | null) => {
                  setReCaptchaValue(value);
                  setReCaptchaError("");
                }}
                ref={captchaRef}
                hl={locale}
              />

              {reCaptchaError ===
                "The g-recaptcha-response parameter not found" && (
                <p>{t("recaptchaErrorMessage")}</p>
              )}
            </div>

            <Button
              size="large"
              type="submit"
              shape="square"
              variant="primary"
              className="w-full text-2xl font-light justify-center text-white"
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
