import cx from "classnames";

import Container from "../Container/Container";

type ImageTileContainer = {
  className?: string;
} & React.ComponentProps<"div">;

const ImageTileContainer = ({
  className,
  children,
  ...other
}: ImageTileContainer) => {
  const classes = cx(
    "image-tile-container py-3 px-4 2xl:px-36 xl:px-24 lg:px-20 md:px-16 sm:px-12 rounded-lg relative z-20",
    className,
  );

  return (
    <Container>
      <div className={classes} {...other}>
        {children}
      </div>
    </Container>
  );
};

export default ImageTileContainer;
