import React, { useState } from "react";
import cx from "classnames";

import { AccordionContext } from "./AccordionContext";

type Accordion = {
  className?: string;
} & React.ComponentProps<"ul">;

const Accordion = ({ className, children, ...other }: Accordion) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const classes = cx("accordion mt-4", className);

  return (
    <ul className={classes} {...other}>
      <AccordionContext.Provider value={{ activeIndex, setActiveIndex }}>
        {children}
      </AccordionContext.Provider>
    </ul>
  );
};

export default Accordion;
