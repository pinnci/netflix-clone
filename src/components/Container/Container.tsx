import cx from "classnames";

type Container = {
  className?: string;
} & React.ComponentProps<"div">;

const Container = ({ children, className, ...other }: Container) => {
  const classes = cx("container max-w-screen-2xl mx-auto ", className);

  return (
    <div className={classes} {...other}>
      {children}
    </div>
  );
};

export default Container;
