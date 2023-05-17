import Image from "next/image";
import { NextSeo } from "next-seo";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Container from "@/components/Container/Container";
import Layout from "../components/Layout/Layout";
import LoginForm from "../components/LoginForm/LoginForm";

import { loginForm } from "../data/login";
import type { Locale } from "@/data/languageSelector";

const Login = () => {
  const { t } = useTranslation(["common", "login"]);
  const { imageSrc } = loginForm;

  return (
    <Layout variant="login">
      <NextSeo
        title={`${t("login:title")}`}
        description={`${t("common:description")}`}
        openGraph={{ description: `${t("common:openGraph.description")}` }}
        additionalMetaTags={[
          { name: "keywords", content: `${t("common:keywords")}` },
        ]}
      />
      <div className="loginForm__gradient absolute w-full min-h-full"></div>
      <div className="loginForm__imageContainer absolute w-full h-full">
        <Image
          src={imageSrc}
          className="loginForm__image object-cover object-left"
          alt={t("login:imageAlt")}
          fill
        />
      </div>
      <Container className="sm:grow relative flex justify-center">
        <LoginForm />
      </Container>
    </Layout>
  );
};

export default Login;

export async function getStaticProps({ locale }: Locale) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["login", "common"])),
    },
  };
}
