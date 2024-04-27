import "@/styles/main.scss";
import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import SEO from "../../next-seo.config";
import { appWithTranslation } from "next-i18next";
import localFont from "next/font/local";
import { AuthProvider } from "../../auth";
import { useEffect } from "react";
import { createContext, useState } from "react";
import { usePathname } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";

const netflixSans = localFont({
  src: [
    {
      path: "../../public/fonts/NetflixSans_W_Th.ttf",
      weight: "100",
    },
    {
      path: "../../public/fonts/NetflixSans_W_Lt.ttf",
      weight: "200",
    },
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

export const PathContext = createContext<any>(null);

function App({ Component, ...props }: AppProps) {
  const [path, setPath] = useState("");
  const currentPath = usePathname();

  useEffect(() => {
    if (!currentPath.includes("/search")) setPath(currentPath);
  }, [currentPath]);

  return (
    <>
      <AuthProvider>
        <PathContext.Provider value={{ path, setPath }}>
          <DefaultSeo {...SEO} />
          <main className={`${netflixSans.variable} font-sans`}>
            <Component {...props.pageProps} />
            <Analytics />
          </main>
        </PathContext.Provider>
      </AuthProvider>
    </>
  );
}

export default appWithTranslation(App);
