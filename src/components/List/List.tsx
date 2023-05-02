import cx from "classnames";

type List = {
  className?: string;
} & React.ComponentProps<"ul">;

const List = ({ className, children, ...other }: List) => {
  const classes = cx("list", className);

  return (
    <ul className={classes} {...other}>
      {children}
    </ul>
  );
};

export default List;
