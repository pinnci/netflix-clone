import cx from "classnames";
import Image, { StaticImageData } from "next/image";

export type ImageTile = {
  className?: string;
  imagePosition: "left" | "right";
  imageSrc: StaticImageData;
  title: string;
  description: string;
  imageAlt: string;
} & React.ComponentProps<"div">;

const ImageTile = ({
  className,
  imagePosition,
  imageSrc,
  imageAlt,
  title,
  description,
  ...props
}: ImageTile) => {
  const classes = cx(
    "image-tile flex items-center flex-col sm:flex-row",
    {
      "flex-row-reverse": imagePosition === "left",
      "flex-row": imagePosition === "right",
    },
    className,
  );

  return (
    <div className={classes} {...props}>
      <div>
        <p className="text-3xl 2xl:text-5xl xl:text-5xl font-black text-white mt-5">
          {title}
        </p>
        <p className="text-base 2xl:text-xl xl:text-xl font-normal	text-white mt-5">
          {description}
        </p>
      </div>

      <div className="image-container w-full relative">
        <Image
          src={imageSrc}
          alt={imageAlt}
          className="image"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={`${imageSrc}`}
        />
      </div>
    </div>
  );
};

export default ImageTile;
