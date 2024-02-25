import { NextSeo } from "next-seo";
import type { Locale } from "@/data/languageSelector";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Layout from "../../components/Layout/Layout";
import Container from "../../components/Container/Container";

const Movie = () => {
  const [locale, setLocale] = useState<Locale["locale"]>("en");

  const { t } = useTranslation("common");

  const router = useRouter();

  useEffect(() => {
    setLocale(router.locale === "cs" ? "cs" : "en");
  }, [router.locale]);

  return (
    <>
      <NextSeo
        title={`${t("defaultTitle")}`}
        description={`${t("description")}`}
        openGraph={{ description: `${t("openGraph.description")}` }}
        additionalMetaTags={[{ name: "keywords", content: `${t("keywords")}` }]}
      />

      <Layout variant="loggedIn">
        <Container className="py-6 pt-20 min-h-screen">
          <h1 className="text-white">Movie</h1>
        </Container>
      </Layout>
    </>
  );
};

export default Movie;

export async function getStaticProps({ locale }: Locale) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "dashboard",
        "modal",
        "popup",
      ])),
    },
  };
}
