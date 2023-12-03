import cx from "classnames";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addEmail } from "../../../slices/registrationEmailSlice";
import { useTranslation } from "next-i18next";

import Button from "../Button/Button";
import Input from "../Input/Input";

type RegistrationEmailForm = {
  className?: string;
  variant: "bordered" | "plain";
} & React.ComponentProps<"div">;

const RegistrationEmailForm = ({
  className,
  variant,
  ...other
}: RegistrationEmailForm) => {
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [inputField, setInputField] = useState<HTMLInputElement | null>(null);

  const { t } = useTranslation("homepage");

  const dispatch = useDispatch();

  const router = useRouter();

  const inputRef = useRef(null);

  const classes = cx(
    "registrationEmailForm w-full border-transparent",
    {
      [`registrationEmailForm--${variant}`]: variant,
      "rounded-lg p-4 pb-6 border-4": variant === "bordered",
    },
    className,
  );

  const checkEmailRegex = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!emailRegex.test(inputValue)) {
      setError(true);
      setSuccess(false);
    } else {
      setError(false);
    }

    if (inputValue === "") setError(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    if (error) {
      checkEmailRegex();
    }

    if (e.target.value === "") {
      setError(false);
      setSuccess(false);
    }
  };

  const handleFocus = () => {
    if (error && inputValue) {
      checkEmailRegex();
    }
  };

  const handleBlur = () => {
    if (inputValue) {
      checkEmailRegex();
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
      router.push("/signup/password");

      dispatch(addEmail(inputValue));

      localStorage.setItem("registration-email", inputValue);
    }
  };

  useEffect(() => {
    setInputField(inputRef.current);

    if (localStorage.getItem("registration-email")) {
      const localStorageRegistrationEmail =
        localStorage.getItem("registration-email");

      if (localStorageRegistrationEmail) {
        setInputValue(localStorageRegistrationEmail);
        setSuccess(true);
        dispatch(addEmail(localStorageRegistrationEmail));
      }
    }
  }, [dispatch]);

  return (
    <div className={classes} {...other}>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <h3 className="registrationEmailForm__title text-lg lg:text-xl">
          {t("registrationEmail.title")}
        </h3>
        <div className="pt-4 flex flex-col items-start sm:flex-row">
          <Input
            label={t("registrationEmail.label")}
            type="email"
            errorMessage={t("registrationEmail.errorMessage")}
            onChange={(e) => handleChange(e)}
            onBlur={handleBlur}
            onFocus={handleFocus}
            ref={inputRef}
            error={error}
            autoComplete="off"
            inputContainerClassName="sm:w-auto sm:max-w-sm"
            value={inputValue}
            success={success}
          />

          <Button
            size="large"
            variant="start"
            shape="square"
            type="submit"
            className="mt-4 sm:mt-0 sm:ml-2 text-white"
          >
            {t("registrationEmail.buttonTitle")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationEmailForm;
