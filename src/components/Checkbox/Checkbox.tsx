import cx from "classnames";
import { useId, useState } from "react";

type Checkbox = {
  label: string;
  className?: string;
  labelClassName?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
} & React.ComponentProps<"input">;

const Checkbox = ({
  label,
  className,
  labelClassName,
  onChange,
  ...other
}: Checkbox) => {
  const [isChecked, setIsChecked] = useState(false);

  const id = useId();
  const classes = cx("checkbox", className);
  const labelClasses = cx("checkbox__label", labelClassName);

  return (
    <div className="checkbox__container flex items-center">
      <input
        type="checkbox"
        className={classes}
        id={id}
        checked={isChecked}
        onClick={() => setIsChecked(!isChecked)}
        onChange={onChange}
        {...other}
      />
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
