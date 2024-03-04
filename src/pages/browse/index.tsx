import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { Locale } from "@/data/languageSelector";
import { NextSeo } from "next-seo";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";

import { firebaseAdmin } from "../../../firebaseAdmin";
import nookies from "nookies";

import Layout from "../../components/Layout/Layout";
import Container from "../../components/Container/Container";
import DashboardBanner from "../../components/DashboardBanner/DashboardBanner";
import DashboardCategoriesContainer from "../../components/DashboardCategoriesContainer/DashboardCategoriesContainer";
import { requests } from "../../data/categoryRequests";

const Dashboard = ({ data }: any) => {
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
        <DashboardBanner movieData={data.dashboardBanner} locale={locale} />
        <Container className="py-6">
          <DashboardCategoriesContainer
            data={data.allCategories}
            locale={locale}
          />
        </Container>
      </Layout>
    </>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const locale = context.locale!;

  const categoryResults: any = {};

  try {
    const cookies = nookies.get(context);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    if (token)
      // Fetch data for each request
      for (const key in requests) {
        if (Object.hasOwnProperty.call(requests, key)) {
          const url = requests[key];
          const response = await fetch(url);

          const data = await response.json();

          const updatedResults = data.results.map((result: any) => {
            let media_type;
            //DETECT MEDIA_TYPE BASED ON CATEGORY URL
            if (url.split("/").some((substring) => substring.includes("tv"))) {
              media_type = "tv";
            } else {
              media_type = "movie";
            }

            // Add the media_type property to the current object
            return { ...result, media_type };
          });

          categoryResults[key] = updatedResults;
        }
      }
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {
        ...(await serverSideTranslations(locale, [
          "homepage",
          "common",
          "dashboard",
        ])),
      },
    };
  }

  // Get trending movies and TV shows
  const allTrendingMedia = await fetch(
    `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${locale}`,
  );
  const allTrendingMediaData = await allTrendingMedia.json();

  const singleTrendingMediaData = allTrendingMediaData.results[0];

  // Get trending movie or TV show detail
  const trendingMediaDetail = await fetch(
    `https://api.themoviedb.org/3/${singleTrendingMediaData.media_type}/${singleTrendingMediaData.id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&append_to_response=videos&language=${locale}`,
  );
  const trendingMediaDetailData = await trendingMediaDetail.json();

  const data = {
    dashboardBanner: {
      mediaType: singleTrendingMediaData.media_type,
      ...trendingMediaDetailData,
    },
    allCategories: categoryResults,
  };

  return {
    props: {
      data,
      ...(await serverSideTranslations(locale, [
        "homepage",
        "common",
        "dashboard",
        "modal",
        "popup",
      ])),
    },
  };
};
