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

  return (
    <>
      <NextSeo
        title={data.title || data.name}
        description={data.overview}
        openGraph={{ description: data.overview }}
      />

      <Layout variant="loggedIn">
        <Container className="py-6 pt-20">
          <p className="text-white">{data.title || data.name}</p>
          <p className="text-white">{data.id}</p>
          <p className="text-white">{data.overview}</p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            lobortis pellentesque leo. Praesent cursus egestas nisl, in placerat
            dui suscipit finibus. Aliquam in commodo sem, a rhoncus urna. Mauris
            efficitur tellus non libero porttitor, a vulputate urna rutrum. Nam
            vel sapien eu libero vestibulum bibendum. Donec vitae pharetra diam,
            sit amet posuere elit. Aenean lacinia, massa eget rhoncus
            pellentesque, dui nisi accumsan arcu, id tempus erat elit posuere
            metus. Nulla non mi vitae massa vestibulum tempor eu quis est.
            Suspendisse tristique lorem eget mauris accumsan, sit amet rhoncus
            diam luctus. Curabitur dapibus elit urna, et condimentum nunc
            ullamcorper ac. Donec a sollicitudin felis, et posuere urna. Fusce
            tempus feugiat sem, eu dignissim dolor suscipit a. Proin iaculis
            metus vitae nulla efficitur cursus. Nunc rutrum nibh eleifend metus
            tincidunt porttitor. Sed gravida massa eu metus interdum mattis.
            Duis libero elit, scelerisque sed diam in, bibendum ullamcorper
            dolor. Proin quis ante non justo sollicitudin aliquet. Proin est
            lectus, pharetra vitae tellus varius, elementum tristique leo. Cras
            sem urna, congue sed consequat eget, volutpat ut arcu. Praesent sed
            magna vitae arcu semper molestie id id sapien. Cras dolor lectus,
            interdum a elementum in, pellentesque non erat. Cras sit amet nulla
            pellentesque, pulvinar magna id, tincidunt dolor. Ut sodales lacus
            eget purus tristique facilisis. Vivamus magna erat, sodales eget
            erat non, consequat aliquet sapien. In quis sapien dignissim,
            euismod libero et, fermentum nisl. Nam vehicula, metus facilisis
            fringilla auctor, velit nisl dapibus tortor, semper bibendum lorem
            nunc ac mi. Aliquam eros ante, venenatis ut neque vel, interdum
            cursus libero. Donec ac diam pellentesque, varius velit id,
            malesuada sapien. Nulla vehicula velit lorem, non gravida nunc
            congue at. Pellentesque euismod eu enim et semper. Curabitur
            consequat commodo leo, sed placerat mauris auctor ac. Duis
            pellentesque nulla venenatis fringilla finibus. Phasellus congue
            porttitor enim nec consequat. Phasellus congue, urna eget aliquam
            pulvinar, nunc massa rutrum lectus, non auctor erat est sed ligula.
            Aenean turpis quam, pulvinar eu rutrum sit amet, cursus et purus.
            Nunc justo erat, pellentesque nec ex vel, malesuada mollis neque.
            Cras ex diam, laoreet vitae tellus at, elementum finibus est. Sed et
            euismod ligula, vitae molestie nulla. Nunc pharetra lorem blandit,
            vulputate orci sit amet, ultricies libero. Pellentesque habitant
            morbi tristique senectus et netus et malesuada fames ac turpis
            egestas. Pellentesque vitae orci vitae tortor viverra tincidunt.
            Etiam eu tempor tellus. Ut congue eleifend consequat. Mauris erat
            diam, condimentum non imperdiet ut, convallis a purus. Fusce eu
            auctor justo. Phasellus commodo ac urna sit amet rutrum. Morbi et
            dolor bibendum, eleifend lorem sit amet, fringilla urna. Praesent
            aliquam euismod tincidunt. Nulla tortor lorem, maximus sodales
            gravida sit amet, semper nec massa. Maecenas leo felis, venenatis id
            mattis ut, cursus vitae magna. Vivamus placerat est vitae lorem
            pulvinar, vel elementum turpis facilisis. Mauris mi risus, interdum
            nec convallis sit amet, elementum vehicula leo. Pellentesque neque
            justo, placerat ut vestibulum id, vestibulum eu nisi. Ut non lacus
            felis. Suspendisse sagittis malesuada tellus, eu egestas sapien
            ultricies at. Integer ac ante ac sem condimentum scelerisque eget eu
            lacus. Nullam viverra felis pellentesque ex imperdiet sollicitudin.
            Nullam nec purus quis tortor maximus dapibus eget eu est. Vestibulum
            augue quam, venenatis quis dapibus sit amet, condimentum at sem.
            Maecenas imperdiet, tellus eu vehicula efficitur, eros arcu mollis
            nisi, vitae sollicitudin nisi ante rutrum est. Interdum et malesuada
            fames ac ante ipsum primis in faucibus. Pellentesque dignissim quis
            sapien eget porta. Aenean semper diam id semper dignissim. Mauris
            placerat vitae neque sit amet cursus.
          </p>
        </Container>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query;
  const locale = context.locale!;

  const movieId = Number(slug?.toString().split("-")[1]);
  const mediaType = slug?.toString().split("-")[0];

  try {
    //Checks for movie
    const res = await axios.get(
      `https://api.themoviedb.org/3/${mediaType}/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${locale}&append_to_response=videos`,
    );
    const data = await res.data;

    //When movie was found based on its ID, check whether there is not mistake in remaining part of slug
    if (
      movieId === data.id &&
      slug ===
        `${mediaType}-${movieId}-${handleStringToUrl(
          data.original_title || data.name || data.title,
        )}`
    ) {
      return {
        props: {
          ...(await serverSideTranslations(locale, ["dashboard"])),
          data,
        },
      };
    } else {
      return {
        notFound: true,
      };
    }
  } catch {
    //When movie was not found then return 404 page
    return {
      notFound: true,
    };
  }
};
export default MovieDetail;
