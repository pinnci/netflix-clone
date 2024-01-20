import { useTranslation } from "next-i18next";
import { NextSeo } from "next-seo";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Layout from "@/components/Layout/Layout";
import ErrorPageContent from "@/components/ErrorPageContent/ErrorPageContent";

import type { Locale } from "@/data/languageSelector";

const ErrorPage = () => {
  const { t } = useTranslation("common");

  return (
    <>
      <NextSeo
        title={`${t("defaultTitle")}`}
        description={`${t("description")}`}
        openGraph={{ description: `${t("openGraph.description")}` }}
        additionalMetaTags={[{ name: "keywords", content: `${t("keywords")}` }]}
      />

      <Layout variant="error">
        <ErrorPageContent />
      </Layout>
    </>
  );
};

export default ErrorPage;

export async function getStaticProps({ locale }: Locale) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["error", "common"])),
    },
  };
}
