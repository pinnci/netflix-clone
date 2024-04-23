import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import Layout from "@/components/Layout/Layout";
import RegistrationPasswordForm from "@/components/RegistrationPasswordForm/RegistrationPasswordForm";

import type { Locale } from "@/data/languageSelector";

const CreatePassword = () => {
  const { t } = useTranslation(["common", "registration"]);
  const [locale, setLocale] = useState<Locale["locale"]>("en");

  const router = useRouter();

  useEffect(() => {
    setLocale(router.locale === "cs" ? "cs" : "en");
  }, [router.locale]);

  return (
    <Layout variant="registration">
      <NextSeo
        title={`${t("registration:buttonTitle")}`}
        description={`${t("common:description")}`}
        openGraph={{ description: `${t("common:openGraph.description")}` }}
        additionalMetaTags={[
          { name: "keywords", content: `${t("common:keywords")}` },
        ]}
      />
      <RegistrationPasswordForm locale={locale} />
    </Layout>
  );
};

export default CreatePassword;

export async function getStaticProps({ locale }: Locale) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "registration",
        "common",
        "dashboard",
      ])),
    },
  };
}
