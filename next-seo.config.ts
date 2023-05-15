import { NextSeoProps } from "next-seo";

const nextSeoConfig: NextSeoProps = {
  canonical: "https://netflix-clone-pinnci.vercel.app/",
  defaultTitle: "Netflix Slovakia - Watch TV Shows Online, Watch Movies Online",
  titleTemplate: "%s | Netflix",
  description:
    "Watch Netflix movies & TV shows online or stream right to your smart TV, game console, PC, Mac, mobile, tablet and more.",
  openGraph: {
    type: "website",
    url: "https://netflix-clone-pinnci.vercel.app/",
    site_name: "Netflix",
    title: "Netflix",
    description:
      "Watch Netflix movies & TV shows online or stream right to your smart TV, game console, PC, Mac, mobile, tablet and more.",
  },
  additionalMetaTags: [
    {
      name: "keywords",
      content:
        "watch movies, movies online, watch TV, TV online, TV shows online, watch TV shows, stream movies, stream tv, instant streaming, watch online, movies, watch movies Slovakia, watch TV online, no download, full length movies",
    },
  ],
  additionalLinkTags: [
    {
      rel: "icon",
      href: "favicon/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      href: "favicon/apple-touch-icon.jpg",
      sizes: "180x180",
    },
  ],
};

export default nextSeoConfig;
