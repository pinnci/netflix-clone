import { ImageTile } from "../components/ImageTile/ImageTile";

import EnjoyYourTvImage from "../../public/images/benefits/enjoy-your-tv.png";
import WatchEverythereImage from "../../public/images/benefits/watch-everywhere.png";
import CreateProfilesForKidsImage from "../../public/images/benefits/create-profile-for-kids.png";
import DownloadYourShowsImage from "../../public/images/benefits/download-your-shows.png";

export type Benefit = {
  title: ImageTile["title"];
  description: ImageTile["description"];
  imageSrc: ImageTile["imageSrc"];
  imagePosition: ImageTile["imagePosition"];
  imageAlt: ImageTile["imageAlt"];
};

export const benefits: Benefit[] = [
  {
    title: "Enjoy on your TV.",
    description:
      "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.",
    imageSrc: EnjoyYourTvImage,
    imagePosition: "right",
    imageAlt: "Enjoy on your TV.",
  },
  {
    title: "Watch everywhere.",
    description:
      "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV without paying more.",
    imageSrc: WatchEverythereImage,
    imagePosition: "left",
    imageAlt: "Watch everywhere.",
  },
  {
    title: "Create profiles for kids.",
    description:
      "Send kids on adventures with their favorite characters in a space made just for them—free with your membership.",
    imageSrc: CreateProfilesForKidsImage,
    imagePosition: "right",
    imageAlt: "Create profiles for kids.",
  },
  {
    title: "Download your shows to watch offline.",
    description:
      "Save your favorites easily and always have something to watch.",
    imageSrc: DownloadYourShowsImage,
    imagePosition: "left",
    imageAlt: "Download your shows to watch offline.",
  },
];
