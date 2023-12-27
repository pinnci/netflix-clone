import Layout from "../components/Layout/Layout";
import Container from "../components/Container/Container";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import DashboardBanner from "../components/DashboardBanner/DashboardBanner";
import DashboardCategoriesContainer from "../components/DashboardCategoriesContainer/DashboardCategoriesContainer";
import type { Locale } from "@/data/languageSelector";
import { NextSeo } from "next-seo";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t } = useTranslation("common");

  return (
    <>
      <NextSeo
        title={`${t("defaultTitle")}`}
        description={`${t("description")}`}
        openGraph={{ description: `${t("openGraph.description")}` }}
        additionalMetaTags={[{ name: "keywords", content: `${t("keywords")}` }]}
      />

      <Layout variant="loggedIn">
        <DashboardBanner />
        <Container className="py-6">
          <DashboardCategoriesContainer />
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
