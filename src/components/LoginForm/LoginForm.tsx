import { useState, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import Input from "../Input/Input";
import Button from "../Button/Button";

import { loginForm } from "@/data/login";

const LoginForm = () => {
  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailInputValue, setEmailInputValue] = useState<string>("");

  const [passwordError, setPasswordError] = useState(false);
  const [passwordInputValue, setPasswordInputValue] = useState<string>("");

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const router = useRouter();

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

  const handleEmailChange = (e: any) => {
    setEmailInputValue(e.target.value);

    if (emailError) {
      checkEmailRegex();
    }

    if (e.target.value === "") {
      setEmailError(false);
    }
  };

  const handleEmailFocus = (e: any) => {
    if (emailError && emailInputValue) {
      checkEmailRegex();
    }
  };

  const handleEmailBlur = (e: any) => {
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

  const handlePasswordChange = (e: any) => {
    setPasswordInputValue(e.target.value);

    if (passwordError) {
      checkPassword();
    }

    if (e.target.value === "") {
      setPasswordError(false);
    }
  };

  const handlePasswordFocus = (e: any) => {
    if (passwordError && passwordInputValue) {
      checkPassword();
    }
  };

  const handlePasswordBlur = (e: any) => {
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
          // ...
          //TO DO DISPATCH IT TO REDUX STATE AND CALL FIREBASE LOGIN FUNCTION
          //dispatch(addEmail(inputValue));
          console.log("user", user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("error code", errorCode);
          console.log("error message", errorMessage);
        });

      router.push("/");
    }
  };

  const {
    title,
    email,
    password,
    buttonLabel,
    checkboxLabel,
    helpLabel,
    signUp,
  } = loginForm;

  return (
    <div className="loginForm__container w-full max-w-none z-20 sm:max-w-md">
      <div className="loginForm sm:pt-16 sm:px-16 sm:pb-10">
        <form className="mb-8" onSubmit={handleSubmit}>
          <h1 className="text-white mt-0 mb-7 font-medium text-3xl">{title}</h1>
          <Input
            type="email"
            label={email.label}
            errorMessage={email.errorMessage}
            error={emailError}
            inputContainerClassName="mb-7"
            onChange={(e) => handleEmailChange(e)}
            onBlur={(e) => handleEmailBlur(e)}
            onFocus={(e) => handleEmailFocus(e)}
            ref={emailInputRef}
          />

          <Input
            type="password"
            label={password.label}
            errorMessage={password.errorMessage}
            error={passwordError}
            inputContainerClassName="mb-10"
            onChange={(e) => handlePasswordChange(e)}
            onBlur={(e) => handlePasswordBlur(e)}
            onFocus={(e) => handlePasswordFocus(e)}
            ref={passwordInputRef}
          />

          <Button
            size="medium"
            variant="primary"
            type="submit"
            className="w-full justify-center mb-3"
          >
            {buttonLabel}
          </Button>

          <div className="flex justify-between">
            <label className="text-neutral-400 text-sm flex items-center">
              <input type="checkbox" className="mr-1" />
              {checkboxLabel}
            </label>

            <Link href="#" className="text-neutral-400 text-sm hover:underline">
              {helpLabel}
            </Link>
          </div>
        </form>

        <span className="text-neutral-400">
          {signUp.title}{" "}
          <Link href={signUp.href} className="text-white hover:underline">
            {signUp.link}
          </Link>
          .
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
