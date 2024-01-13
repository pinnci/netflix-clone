import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import axios from "axios";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Layout from "@/components/Layout/Layout";
import Container from "@/components/Container/Container";

import { handleStringToUrl } from "@/utils/utils";

type MovieDetail = {
  data: {
    title: string;
    name: string;
    id: number;
    overview: string;
  };
};

const MovieDetail = ({ data }: MovieDetail) => {
  console.log("data", data);
  return <div></div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query;
  const locale = context.locale!;

  const movieId = Number(slug?.toString().split("-")[0]);

  try {
    //Checks for movie
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${locale}&append_to_response=videos`,
    );
    const data = await res.data;

    if (
      movieId === data.id &&
      slug ===
        `${movieId}-${handleStringToUrl(
          data.original_title || data.name || data.title,
        )}`
    ) {
      return {
        props: {
          ...(await serverSideTranslations(locale, ["dashboard", "common"])),
          data,
        },
      };
    } else {
      //Checks for TV shows when movie's ID and title is not matching
      const res = await axios.get(
        `https://api.themoviedb.org/3/tv/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${locale}&append_to_response=videos`,
      );
      const data = await res.data;

      return {
        props: {
          ...(await serverSideTranslations(locale, ["dashboard", "common"])),
          data,
        },
      };
    }
  } catch (error) {
    //Checks for TV shows when movie could not be found
    const res = await axios.get(
      `https://api.themoviedb.org/3/tv/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${locale}&append_to_response=videos`,
    );
    const data = await res.data;

    return {
      props: {
        ...(await serverSideTranslations(locale, ["dashboard", "common"])),
        data,
      },
    };
  }
};

export default MovieDetail;
