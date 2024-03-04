import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { NextSeo } from "next-seo";
import nookies from "nookies";
import { firebaseAdmin } from "../../firebaseAdmin";
import { GetServerSidePropsContext } from "next";

import Homepage from "../components/Homepage/Homepage";

export default function Home() {
  const { t } = useTranslation("common");

  return (
    <>
      <NextSeo
        title={`${t("defaultTitle")}`}
        description={`${t("description")}`}
        openGraph={{ description: `${t("openGraph.description")}` }}
        additionalMetaTags={[{ name: "keywords", content: `${t("keywords")}` }]}
      />
      <React.Fragment>
        <Homepage />
      </React.Fragment>
    </>
  );
}

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
          "homepage",
          "common",
          "dashboard",
        ])),
      },
    };
  }
};
