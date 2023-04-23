import cx from "classnames";

type Divider = {
  className?: string;
} & React.ComponentProps<"div">;

const Divider = ({ className, ...other }: Divider) => {
  const classes = cx("divider-container py-3", className);
  return (
    <div className={classes} {...other}>
      <div className="divider w-full"></div>
    </div>
  );
};

export default Divider;
