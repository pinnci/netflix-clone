import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import Input from "../Input/Input";
import Button from "../Button/Button";
import Checkbox from "../Checkbox/Checkbox";
import Toast from "../Toast/Toast";

const LoginForm = () => {
  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailInputValue, setEmailInputValue] = useState<string>("");

  const [passwordError, setPasswordError] = useState(false);
  const [passwordInputValue, setPasswordInputValue] = useState<string>("");

  const [firebaseErrorCode, setFirebaseErrorCode] = useState<string | null>(
    null,
  );

  const [rememberMe, setRememberMe] = useState(false);

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const router = useRouter();

  const { t } = useTranslation("login");

  //EMAIL CHECK
  const checkEmailRegex = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!emailRegex.test(emailInputValue)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (emailInputValue === "") setEmailError(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInputValue(e.target.value);

    if (emailError) {
      checkEmailRegex();
    }

    if (e.target.value === "") {
      setEmailError(false);
    }
  };

  const handleEmailFocus = () => {
    if (emailError && emailInputValue) {
      checkEmailRegex();
    }
  };

  const handleEmailBlur = () => {
    if (emailInputValue) {
      checkEmailRegex();
    }
  };

  //PASSWORD CHECK
  const checkPassword = () => {
    if (passwordInputValue.length >= 5) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }

    if (passwordInputValue === "") setPasswordError(false);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInputValue(e.target.value);

    if (passwordError) {
      checkPassword();
    }

    if (e.target.value === "") {
      setPasswordError(false);
    }
  };

  const handlePasswordFocus = () => {
    if (passwordError && passwordInputValue) {
      checkPassword();
    }
  };

  const handlePasswordBlur = () => {
    if (passwordInputValue) {
      checkPassword();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!emailInputValue && !emailError) {
      setEmailError(true);
    }

    if (!passwordInputValue && !passwordError) {
      setPasswordError(true);
    }

    if (
      !emailError &&
      emailInputValue &&
      !passwordError &&
      passwordInputValue
    ) {
      signInWithEmailAndPassword(auth, emailInputValue, passwordInputValue)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("user", user);

          if (rememberMe) {
            //Write to localStorage when checkbox is checked
            localStorage.setItem(
              "login-credentials",
              JSON.stringify({
                email: emailInputValue,
                password: passwordInputValue,
              }),
            );
          }

          if (firebaseErrorCode) {
            setFirebaseErrorCode(null);
          }

          router.push("/");
        })
        .catch((error) => {
          setFirebaseErrorCode(error.code);
        });
    }
  };

  //REMEMBER ME
  const handleRememberMe = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  useEffect(() => {
    const userCredentials = localStorage.getItem("login-credentials");
    //@ts-ignore
    const parsedUserCredentials = JSON.parse(userCredentials);

    if (userCredentials) {
      const email = parsedUserCredentials.email;
      const password = parsedUserCredentials.password;

      setEmailInputValue(email);
      setPasswordInputValue(password);
    }
  }, []);

  return (
    <div className="loginForm__container w-full max-w-none z-20 sm:max-w-md">
      <div className="loginForm sm:pt-16 sm:px-16 sm:pb-10">
        <form className="mb-8" onSubmit={handleSubmit}>
          <h1 className="text-white mt-0 mb-7 font-medium text-3xl">
            {t("title")}
          </h1>

          {firebaseErrorCode && (
            <Toast className="mb-4">
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

          <Input
            type="email"
            label={t("emailInput.label")}
            errorMessage={t("emailInput.errorMessage")}
            error={emailError}
            inputContainerClassName="mb-7"
            onChange={(e) => handleEmailChange(e)}
            onBlur={handleEmailBlur}
            onFocus={handleEmailFocus}
            ref={emailInputRef}
            value={emailInputValue}
          />

          <Input
            type="password"
            label={t("passwordInput.label")}
            errorMessage={t("passwordInput.errorMessage")}
            error={passwordError}
            inputContainerClassName="mb-10"
            onChange={(e) => handlePasswordChange(e)}
            onBlur={handlePasswordBlur}
            onFocus={handlePasswordFocus}
            ref={passwordInputRef}
            value={passwordInputValue}
          />

          <Button
            size="medium"
            variant="primary"
            type="submit"
            className="w-full justify-center mb-3"
          >
            {t("buttonLabel")}
          </Button>

          <div className="flex justify-between">
            <Checkbox
              label={t("checkboxLabel")}
              className="mr-1"
              labelClassName="text-neutral-400 text-sm"
              onChange={handleRememberMe}
            />

            <Link href="#" className="text-neutral-400 text-sm hover:underline">
              {t("helpLabel")}
            </Link>
          </div>

          <span
            className="mt-4 block text-xs text-neutral-400 hover:cursor-pointer"
            onClick={() => {
              localStorage.removeItem("login-credentials");
            }}
          >
            Clear out remember me
          </span>
        </form>

        <span className="text-neutral-400">
          {t("signUp.title")}{" "}
          <Link
            href={`${t("signUp.href")}`}
            className="text-white hover:underline"
          >
            {t("signUp.link")}
          </Link>
          .
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
