import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import cx from "classnames";

import Button from "../Button/Button";
import Input from "../Input/Input";

type EmailSubscription = {
  className?: string;
  variant: "bordered" | "plain";
} & React.ComponentProps<"div">;

const EmailSubscription = ({
  className,
  variant,
  ...other
}: EmailSubscription) => {
  const [error, setError] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [inputField, setInputField] = useState<HTMLInputElement | null>(null);

  const router = useRouter();

  const inputRef = useRef(null);

  const classes = cx(
    "email-subscription w-full border-transparent",
    {
      [`email-subscription--${variant}`]: variant,
      "rounded-lg p-4 pb-6 border-4": variant === "bordered",
    },
    className,
  );

  const checkEmailRegex = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!emailRegex.test(inputValue)) {
      setError(true);
    } else {
      setError(false);
    }

    if (inputValue === "") setError(false);
  };

  const handleChange = (e: any) => {
    setInputValue(e.target.value);

    if (error) {
      checkEmailRegex();
    }

    if (e.target.value === "") {
      setError(false);
    }
  };

  const handleFocus = (e: any) => {
    if (error && inputValue) {
      checkEmailRegex();
    }
  };

  const handleBlur = (e: any) => {
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
    }
  };

  useEffect(() => {
    setInputField(inputRef.current);
  }, []);

  return (
    <div className={classes} {...other}>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <h3 className="email-subscription__title text-lg lg:text-xl">
          Ready to watch? Enter your email to create or restart your membership.
        </h3>
        <div className="pt-4 flex flex-col items-start sm:flex-row">
          <Input
            label="Email adress"
            type="email"
            errorMessage="Please enter a valid email address"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e)}
            onFocus={(e) => handleFocus(e)}
            ref={inputRef}
            error={error}
            autoComplete="off"
          />

          <Button
            variant="start"
            type="submit"
            className="mt-4 sm:mt-0 sm:ml-2"
          >
            Get started
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EmailSubscription;
