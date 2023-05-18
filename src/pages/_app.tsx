import "@/styles/main.scss";
import type { AppProps } from "next/app";
import { wrapper } from "../../store";
import { DefaultSeo } from "next-seo";
import SEO from "../../next-seo.config";
import { appWithTranslation } from "next-i18next";
import { Provider } from "react-redux";
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

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <>
      <Provider store={store}>
        <DefaultSeo {...SEO} />
        <main className={`${netflixSans.variable} font-sans`}>
          <Component {...props.pageProps} />
        </main>
      </Provider>
    </>
  );
}

export default appWithTranslation(App);
