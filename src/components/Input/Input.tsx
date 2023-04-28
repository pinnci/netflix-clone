import { useId, useState, useRef } from "react";
import cx from "classnames";

import Icon from "../Icon/Icon";

// How to make it validate only after first onBlur?

type Input = {
  labelClassName?: string;
  inputClassName?: string;
  label: string;
  type?: "email" | "text";
  errorMessage: string;
  error: boolean;
} & React.ComponentProps<"input">;

const Input = ({
  label,
  labelClassName,
  inputClassName,
  type = "text",
  errorMessage,
  error,
  ...other
}: Input) => {
  const [inputActivated, setInputActivated] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();

  const labelClasses = cx(
    "input__field__label absolute leading-6",
    {
      "input__field__label--active text-xs": inputActivated,
      "input__field__label--filled text-xs": inputValue,
    },
    labelClassName,
  );

  const inputClasses = cx(
    "input__field__input border rounded border-solid pt-6 px-4 pb-2 w-full leading-6",
    {
      "input__field__input--error": error,
    },
    inputClassName,
  );

  const onFocus = () => setInputActivated(true);

  const onBlur = () => {
    setInputActivated(false);

    if (inputRef.current!.value) {
      setInputActivated(true);
    }
  };

  const handleChange = () => {
    if (inputRef.current) {
      setInputValue(inputRef.current.value);
    }
  };

  return (
    <div className="input__field__container border-1 relative inline-flex w-full flex-auto max-w-none sm:w-auto sm:max-w-sm">
      <label className={labelClasses} htmlFor={inputId}>
        {label}
      </label>
      <div className="input__field__inputWrapper w-full p-0">
        <input
          type={type}
          id={inputId}
          className={inputClasses}
          ref={inputRef}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={handleChange}
          {...other}
        />
        {error ? (
          <span className="input__field__errorMessage flex items-center mt-2">
            <Icon name="error" className="mr-1" /> {errorMessage}
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default Input;
