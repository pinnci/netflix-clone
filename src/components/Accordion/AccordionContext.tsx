import { createContext } from "react";

type AccordionContextType = {
  activeIndex: string | number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<any>>;
};

const AccordionState = {
  activeIndex: null,
  setActiveIndex: () => {},
};

export const AccordionContext =
  createContext<AccordionContextType>(AccordionState);
