import React, { useEffect } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { NextSeo } from "next-seo";

import Homepage from "../components/Homepage/Homepage";
import Dashboard from "@/components/Dashboard/Dashboard";

import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "../../slices/userSlice";

import type { Locale } from "@/data/languageSelector";

export default function Home() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const { t } = useTranslation("common");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Logged In
        dispatch(
          login({
            uid: user.uid,
            email: user.email,
          }),
        );
      } else {
        // Logged out
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <>
      <NextSeo
        title={`${t("defaultTitle")}`}
        description={`${t("description")}`}
        openGraph={{ description: `${t("openGraph.description")}` }}
        additionalMetaTags={[{ name: "keywords", content: `${t("keywords")}` }]}
      />
      <React.Fragment>{!user ? <Homepage /> : <Dashboard />}</React.Fragment>
    </>
  );
}

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
