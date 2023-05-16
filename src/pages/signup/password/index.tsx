import { NextSeo } from "next-seo";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import Layout from "@/components/Layout/Layout";
import RegistrationPasswordForm from "@/components/RegistrationPasswordForm/RegistrationPasswordForm";

import type { Locale } from "@/data/languageSelector";

const CreatePassword = () => {
  const { t } = useTranslation("registration");

  return (
    <Layout variant="registration">
      <NextSeo title={`${t("buttonTitle")}`} />
      <RegistrationPasswordForm />
    </Layout>
  );
};

export default CreatePassword;

export async function getStaticProps({ locale }: Locale) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["registration"])),
    },
  };
}
