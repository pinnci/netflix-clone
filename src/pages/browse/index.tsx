import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { Locale } from "@/data/languageSelector";
import { NextSeo } from "next-seo";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Layout from "../../components/Layout/Layout";
import Container from "../../components/Container/Container";
import DashboardBanner from "../../components/DashboardBanner/DashboardBanner";
import DashboardCategoriesContainer from "../../components/DashboardCategoriesContainer/DashboardCategoriesContainer";

const Dashboard = () => {
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
        <DashboardBanner locale={locale} />
        <Container className="py-6">
          <DashboardCategoriesContainer locale={locale} />
        </Container>
      </Layout>
    </>
  );
};

export default Dashboard;

export async function getStaticProps({ locale }: Locale) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "homepage",
        "common",
        "dashboard",
        "modal",
        "popup",
      ])),
    },
  };
}
