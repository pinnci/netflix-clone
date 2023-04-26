import cx from "classnames";

import Button from "../Button/Button";

type EmailSubscription = {
  className?: string;
} & React.ComponentProps<"div">;

const EmailSubscription = ({ className, ...other }: EmailSubscription) => {
  const classes = cx(
    "email-subscription rounded-lg w-full border-4 border-transparent mt-8 p-4",
    className,
  );

  return (
    <div className={classes} {...other}>
      <form className="flex flex-col">
        <h3 className="email-subscription__title  text-lg lg:text-xl">
          Ready to watch? Enter your email to create or restart your membership.
        </h3>
        <div className="pt-4 flex flex-col items-start sm:flex-row">
          <div className="border-1 relative inline-flex w-full flex-auto max-w-none sm:w-auto sm:max-w-sm">
            <label className="email-subscription__label absolute leading-6">
              Email adress
            </label>
            <div className="email-subscription__inputWrapper w-full p-0">
              <input
                type="email"
                className="email-subscription__input border rounded border-solid pt-6 px-4 pb-2 w-full leading-6"
              />
            </div>
          </div>
          <Button
            variant="primary"
            href="#"
            className="py-2 px-4 mt-4 font-medium text-white text-lg rounded items-center sm:text-2xl sm:py-3 sm:px-6 sm:ml-2 sm:mt-0"
          >
            Get started
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EmailSubscription;
