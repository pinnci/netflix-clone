import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import cx from "classnames";

type Modal = {
  isOpened: boolean;
  children: any;
  className?: string;
  onClose: () => void;
} & React.ComponentProps<"div">;

const Modal = ({ children, className, isOpened, onClose }: Modal) => {
  const [pageYoffset, setPageYoffset] = useState<number>(0);
  const [transitionType, setTransitionType] = useState<
    "fadeIn" | "fadeOut" | null
  >(null);

  const classes = cx(
    "modal fixed left-1/2 overflow-y-auto z-50 rounded-md w-full h-full max-h-full top-0 sm:top-16 sm:w-11/12 sm:h-auto md:w-11/12 lg:w-9/12 xl:w-8/12",
    {
      ["modal--active"]: transitionType === "fadeIn",
      ["modal--inActive"]: transitionType === "fadeOut",
    },
    className,
  );

  const overlayClasses = cx(
    "modal__overlay z-50 fixed top-0 right-0 bottom-0 left-0",
    {
      ["modal__overlay--active"]: transitionType === "fadeIn",
      ["modal__overlay--inActive"]: transitionType === "fadeOut",
    },
  );

  const modalRoot: Element | DocumentFragment =
    document.getElementById("root-modals")!;

  //Prevent scrolling when modal is opened
  //When modal is closed, restore this scroll position
  //Handle fadeIn animation
  useEffect(() => {
    if (isOpened) {
      setTimeout(() => setTransitionType("fadeIn"), 0);

      setPageYoffset(window.scrollY);

      if (pageYoffset)
        document.body.setAttribute(
          "style",
          `position: fixed; top: -${pageYoffset}px; left: 0; right: 0;`,
        );
    } else {
      document.body.setAttribute("style", "");
      window.scrollTo(0, pageYoffset);
    }
  }, [isOpened, pageYoffset]);

  //Handle fadeOut animation and onClose function which passed as a prop
  const handleClose = useCallback(() => {
    setTimeout(() => {
      setTransitionType("fadeOut");

      setTimeout(() => onClose(), 300);
    }, 0);
  }, [onClose]);

  //Support closing modal by pressing ESC button on keyboard
  useEffect(() => {
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        return handleClose();
      }
    });
  }, [handleClose]);

  if (!isOpened) return null;

  return createPortal(
    <>
      <div className={overlayClasses} onClick={handleClose} />
      <div className={classes}>
        <div className="modal__content">
          <button onClick={handleClose}>Close</button>
          {children}
        </div>
      </div>
    </>,
    modalRoot,
  );
};

export default Modal;
