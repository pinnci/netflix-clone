import { ImageTile } from "../components/ImageTile/ImageTile";

import EnjoyYourTvImage from "../../public/images/benefits/enjoy-your-tv.png";
import WatchEverythereImage from "../../public/images/benefits/watch-everywhere.png";
import CreateProfilesForKidsImage from "../../public/images/benefits/create-profile-for-kids.png";
import DownloadYourShowsImage from "../../public/images/benefits/download-your-shows.png";

export type Benefit = {
  imageSrc: ImageTile["imageSrc"];
  imagePosition: ImageTile["imagePosition"];
};

export const benefits: Benefit[] = [
  {
    imageSrc: EnjoyYourTvImage,
    imagePosition: "right",
  },
  {
    imageSrc: WatchEverythereImage,
    imagePosition: "left",
  },
  {
    imageSrc: CreateProfilesForKidsImage,
    imagePosition: "right",
  },
  {
    imageSrc: DownloadYourShowsImage,
    imagePosition: "left",
  },
];
