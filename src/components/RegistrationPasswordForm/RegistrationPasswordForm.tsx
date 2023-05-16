import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import cx from "classnames";
import Link from "next/link";

import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useSelector } from "react-redux";
import { AppState } from "../../../store";

import Container from "../Container/Container";
import Input from "../Input/Input";
import Button from "../Button/Button";

import { registrationPasswordForm } from "../../data/registration";

type RegistrationPasswordForm = {
  className?: string;
} & React.ComponentProps<"form">;

const RegistrationPasswordForm = ({
  className,
  ...other
}: RegistrationPasswordForm) => {
  const [error, setError] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [inputField, setInputField] = useState<HTMLInputElement | null>(null);

  const router = useRouter();

  const inputRef = useRef(null);

  const registrationEmail = useSelector(
    (state: AppState) => state.registrationEmail.value,
  );

  const classes = cx(
    "registrationPasswordForm flex justify-center mt-5",
    className,
  );

  const {
    title,
    description,
    emailLabel,
    inputLabel,
    forgottenPassword,
    buttonTitle,
    errorMessage,
  } = registrationPasswordForm;

  const checkPassword = () => {
    if (inputValue.length >= 5) {
      setError(false);
    } else {
      setError(true);
    }

    if (inputValue === "") setError(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    if (error) {
      checkPassword();
    }

    if (e.target.value === "") {
      setError(false);
    }
  };

  const handleFocus = () => {
    if (error && inputValue) {
      checkPassword();
    }
  };

  const handleBlur = () => {
    if (inputValue) {
      checkPassword();
    }
  };

  const focusInput = () => {
    inputField && inputField.focus();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputValue && !error) {
      focusInput();
    }

    if (!error && inputValue) {
      createUserWithEmailAndPassword(auth, registrationEmail, inputValue)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(userCredential);
          console.log(user);
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
    setInputField(inputRef.current);
  }, []);

  return (
    <Container className="grow pb-40">
      <div className="pt-8 pb-16">
        <form className={classes} {...other} onSubmit={handleSubmit}>
          <div className="max-w-md">
            <h1
              dangerouslySetInnerHTML={{ __html: title }}
              className="text-3xl font-medium"
            />

            <p className="text-lg">{description}</p>

            <div className="mt-4 mb-8">
              <p className="text-base">{emailLabel}</p>
              <p className="text-base font-medium mb-4">{registrationEmail}</p>

              <Input
                label={inputLabel}
                type="password"
                errorMessage={errorMessage}
                onChange={(e) => handleChange(e)}
                onBlur={handleBlur}
                onFocus={handleFocus}
                ref={inputRef}
                error={error}
                variant="light"
              />
            </div>

            <Link
              href={forgottenPassword.href}
              className="text-blue-500 block mb-6 hover:underline"
            >
              {forgottenPassword.title}
            </Link>

            <Button
              size="large"
              type="submit"
              variant="primary"
              className="w-full text-2xl font-light justify-center"
            >
              {buttonTitle}
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default RegistrationPasswordForm;
