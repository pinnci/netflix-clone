import cx from "classnames";

type Toast = {
  className?: string;
} & React.ComponentProps<"div">;

const Toast = ({ className, children, ...other }: Toast) => {
  const classes = cx("toast py-2.5 px-5 rounded", className);

  return (
    <div className={classes} {...other}>
      {children}
    </div>
  );
};

export default Toast;
