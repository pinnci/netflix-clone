import cx from "classnames";

type ListItem = {
  className?: string;
} & React.ComponentProps<"li">;

const ListItem = ({ className, children, ...other }: ListItem) => {
  const classes = cx("listItem", className);

  return (
    <li className={classes} {...other}>
      {children}
    </li>
  );
};

export default ListItem;
