import "@/styles/main.scss";
import type { AppProps } from "next/app";

import localFont from "next/font/local";

const netflixSans = localFont({
  src: [
    {
      path: "../../public/fonts/NetflixSans_W_Rg.woff2",
      weight: "400",
    },
    {
      path: "../../public/fonts/NetflixSans_W_Md.woff2",
      weight: "500",
    },
    {
      path: "../../public/fonts/NetflixSans_W_Bd.woff2",
      weight: "700",
    },
    {
      path: "../../public/fonts/NetflixSans_W_Blk.woff2",
      weight: "900",
    },
  ],
  variable: "--font-netflixSans",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${netflixSans.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  );
}
