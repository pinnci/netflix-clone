import "@/styles/main.scss";
import type { AppProps } from "next/app";
import { wrapper } from "../../store";
import { DefaultSeo } from "next-seo";
import SEO from "../../next-seo.config";
import { appWithTranslation } from "next-i18next";
import { Provider } from "react-redux";
import localFont from "next/font/local";
import { useRouter } from "next/router";

import { auth } from "../firebase";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useState } from "react";
import { usePathname } from "next/navigation";

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

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const router = useRouter();
  const { pathname } = router;

  const [path, setPath] = useState("");
  const currentPath = usePathname();

  useEffect(() => {
    if (!currentPath.includes("/search")) setPath(currentPath);
  }, [currentPath]);

  //Prevent
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      const paths = ["/browse", "/search", "/watch/[slug]"];

      if (user) {
        return;
      }

      if (pathname === "/") {
        return;
      }

      if (paths.includes(pathname)) {
        return router.push("/login");
      }
    });
  }, [router, pathname]);

  return (
    <>
      <Provider store={store}>
        <PathContext.Provider value={{ path, setPath }}>
          <DefaultSeo {...SEO} />
          <main className={`${netflixSans.variable} font-sans`}>
            <Component {...props.pageProps} />
          </main>
        </PathContext.Provider>
      </Provider>
    </>
  );
}

export default appWithTranslation(App);
