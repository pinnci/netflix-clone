import { useId, useState, useRef, forwardRef } from "react";
import cx from "classnames";

import Icon from "../Icon/Icon";

type Input = {
  labelClassName?: string;
  inputClassName?: string;
  label: string;
  type?: "email" | "text";
  errorMessage: string;
  error: boolean;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: React.FocusEventHandler<HTMLInputElement>;
  ref?: any;
} & React.ComponentProps<"input">;

const Input = forwardRef((props: Input, ref) => {
  const {
    label,
    labelClassName,
    inputClassName,
    type = "text",
    errorMessage,
    error,
    onBlur,
    onFocus,
    onChange,
    ...other
  } = props;

  const [inputActivated, setInputActivated] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const localRef = useRef<HTMLInputElement>(null);

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

  const localOnFocus = () => setInputActivated(true);

  const localOnBlur = () => {
    setInputActivated(false);

    if (localRef.current!.value) {
      setInputActivated(true);
    }
  };

  const localOnChange = () => {
    if (localRef.current) {
      setInputValue(localRef.current.value);
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
          ref={
            ref
              ? (el) => {
                  //@ts-ignore
                  ref.current = el;
                  //@ts-ignore
                  localRef.current = el;
                }
              : localRef
          }
          onFocus={
            onFocus
              ? (e) => {
                  onFocus(e);
                  localOnFocus();
                }
              : localOnFocus
          }
          onBlur={
            onBlur
              ? (e) => {
                  onBlur(e);
                  localOnBlur();
                }
              : localOnBlur
          }
          onChange={
            onChange
              ? (e) => {
                  onChange(e);
                  localOnChange();
                }
              : localOnBlur
          }
          {...other}
        />
        {error ? (
          <span className="input__field__errorMessage absolute flex items-center">
            <Icon name="error" className="mr-1" /> {errorMessage}
          </span>
        ) : null}
      </div>
    </div>
  );
});

Input.displayName = "Input";

export default Input;
