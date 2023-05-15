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
};

export type Faq = {
  title: string;
  description: string | string[];
};

export const benefits: Benefit[] = [
  {
    title: "Enjoy on your TV.",
    description:
      "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.",
    imageSrc: EnjoyYourTvImage,
    imagePosition: "right",
  },
  {
    title: "Watch everywhere.",
    description:
      "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV without paying more.",
    imageSrc: WatchEverythereImage,
    imagePosition: "left",
  },
  {
    title: "Create profiles for kids.",
    description:
      "Send kids on adventures with their favorite characters in a space made just for them—free with your membership.",
    imageSrc: CreateProfilesForKidsImage,
    imagePosition: "right",
  },
  {
    title: "Download your shows to watch offline.",
    description:
      "Save your favorites easily and always have something to watch.",
    imageSrc: DownloadYourShowsImage,
    imagePosition: "left",
  },
];

export const faq: Faq[] = [
  {
    title: "What is Netflix?",
    description: [
      "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
      "You can watch as much as you want, whenever you want – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!",
    ],
  },
  {
    title: "How much does Netflix cost?",
    description:
      "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from $6.99 to $19.99 a month. No extra costs, no contracts.",
  },
  {
    title: "Where can I watch?",
    description: [
      "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.",
      "You can also download your favorite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.",
    ],
  },
  {
    title: "How do I cancel?",
    description:
      "Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.",
  },
  {
    title: "What can I watch on Netflix?",
    description:
      "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.",
  },
  {
    title: "Is Netflix good for kids?",
    description: [
      "The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space.",
      "Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see.",
    ],
  },
];
