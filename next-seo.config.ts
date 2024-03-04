import { NextSeoProps } from "next-seo";

const nextSeoConfig: NextSeoProps = {
  canonical: "https://netflix-clone-pinnci.vercel.app/",
  titleTemplate: "Netflix | %s",
  openGraph: {
    type: "website",
    url: "https://netflix-clone-pinnci.vercel.app/",
    site_name: "Netflix",
    title: "Netflix",
  },
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
    {
      rel: "preconnect",
      href: "https://apis.google.com",
    },
    {
      rel: "preconnect",
      href: "https://api.themoviedb.org",
    },
  ],
};

export default nextSeoConfig;
