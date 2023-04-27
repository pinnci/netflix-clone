import React, { useContext } from "react";
import cx from "classnames";

import { AccordionContext } from "./AccordionContext";
import Icon from "../Icon/Icon";

type AccordionItem = {
  className?: string;
  title: string | React.ReactNode;
  index: number;
} & React.ComponentProps<"li">;

const AccordionItem = ({
  className,
  children,
  title,
  index,
  ...other
}: AccordionItem) => {
  const { activeIndex, setActiveIndex } = useContext(AccordionContext);

  const handleClick = () => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const classes = cx(
    "accordion__item mb-2",
    { "accordion__item--active": activeIndex === index },
    className,
  );

  return (
    <li className={classes} {...other}>
      <h3 className="accordion__item__header border-b text-lg lg:text-2xl">
        <button
          className="text-white p-6 w-full text-left flex items-center justify-between"
          onClick={handleClick}
        >
          {title}
          <Icon name="plus" className="accordion__item__indicator" />
        </button>
      </h3>
      <div className="accordion__content px-6 text-lg lg:text-2xl">
        {typeof children !== "object" ? (
          <span>{children}</span>
        ) : (
          React.Children.map(children, (child, index) => {
            return (
              <span
                className={cx("block", {
                  //@ts-ignore
                  "mb-4": index < children.length - 1,
                })}
              >
                {child}
              </span>
            );
          })
        )}
      </div>
    </li>
  );
};

export default AccordionItem;
