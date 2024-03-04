import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useRouter as nextRouter } from "next/router";
import nookies from "nookies";

import Layout from "@/components/Layout/Layout";
import Container from "@/components/Container/Container";
import SearchResults from "@/components/SearchResults/SearchResults";
import type { Locale } from "@/data/languageSelector";
import type { DashboardMovie as DashboardMovieType } from "../components/DashboardMovie/DashboardMovie";
import { MovieData } from "@/utils/utils";

import { firebaseAdmin } from "../../firebaseAdmin";

type SearchPage = {
  data: {
    results: [DashboardMovieType];
  };
};

const SearchPage = ({ data }: SearchPage) => {
  const [locale, setLocale] = useState<Locale["locale"]>("en");

  const { t } = useTranslation("common");

  const searchParams = useSearchParams();
  const router = useRouter();
  const nextrouter = nextRouter();

  const searchedQuery = searchParams.toString().replace("query=", "");

  useEffect(() => {
    setLocale(nextrouter.locale === "cs" ? "cs" : "en");
  }, [nextrouter.locale]);

  //Check whether there is searched query. If not, redirect to dashboard
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (!params.get("query")) {
      router.push("/browse");
    }
  });

  return (
    <>
      <NextSeo
        title={`${t("defaultTitle")}`}
        description={`${t("description")}`}
        openGraph={{ description: `${t("openGraph.description")}` }}
        additionalMetaTags={[{ name: "keywords", content: `${t("keywords")}` }]}
      />

      <Layout variant="loggedIn">
        <Container className="py-6 pt-20 min-h-screen">
          <SearchResults
            results={data.results}
            locale={locale}
            searchedQuery={searchedQuery}
          />
        </Container>
      </Layout>
    </>
  );
};

export default SearchPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context.query;
  const locale = context.locale!;

  const normalizedQuery = query?.toString().replace(" ", "+");

  try {
    const cookies = nookies.get(context);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    //Checks for movies
    const movies = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${normalizedQuery}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${locale}&append_to_response=videos`,
    );
    const moviesData = await movies.json();

    const moviesWithTypes = moviesData.results.map((movie: MovieData) => ({
      ...movie,
      media_type: "movie",
    }));

    //Checks for TV shows
    const tv = await fetch(
      `https://api.themoviedb.org/3/search/tv?query=${normalizedQuery}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${locale}&append_to_response=videos`,
    );
    const tvData = await tv.json();

    const tvShowsWithTypes = tvData.results.map((tv: MovieData) => ({
      ...tv,
      media_type: "tv",
    }));

    const data = { results: [...moviesWithTypes, ...tvShowsWithTypes] };

    return {
      props: {
        ...(await serverSideTranslations(locale, [
          "common",
          "dashboard",
          "modal",
          "popup",
        ])),
        data,
      },
    };
  } catch {
    //When movie or tv show was not found then return null data
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {
        ...(await serverSideTranslations(locale, [
          "common",
          "dashboard",
          "modal",
          "popup",
        ])),
        data: null,
      },
    };
  }
};
