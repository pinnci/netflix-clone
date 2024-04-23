import Image from "next/image";
import { NextSeo } from "next-seo";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSidePropsContext } from "next";
import nookies from "nookies";
import { firebaseAdmin } from "../../firebaseAdmin";

import Container from "@/components/Container/Container";
import Layout from "../components/Layout/Layout";
import LoginForm from "../components/LoginForm/LoginForm";

import { loginForm } from "../data/login";

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
      <div className="hidden loginForm__gradient absolute w-full min-h-full sm:absolute sm:block"></div>
      <div className="hidden loginForm__imageContainer absolute w-full h-full sm:absolute sm:block">
        <Image
          src={imageSrc}
          className="loginForm__image hidden object-cover object-left sm:block"
          alt={t("login:imageAlt")}
          fill
          priority
        />
      </div>
      <Container className="sm:grow relative flex justify-center">
        <LoginForm />
      </Container>
    </Layout>
  );
};

export default Login;

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const locale = context.locale!;

  try {
    const cookies = nookies.get(context);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    return {
      redirect: {
        permanent: false,
        destination: "/browse",
      },
      props: {
        ...(await serverSideTranslations(locale, [
          "homepage",
          "common",
          "dashboard",
        ])),
      },
    };
  } catch (err) {
    return {
      props: {
        ...(await serverSideTranslations(locale, [
          "login",
          "common",
          "dashboard",
        ])),
      },
    };
  }
};
