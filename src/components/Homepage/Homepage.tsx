import React from "react";
import { useTranslation } from "next-i18next";

import Layout from "../Layout/Layout";
import HeroBanner from "../HeroBanner/HeroBanner";
import ImageTileContainer from "../ImageTileContainer/ImageTileContainer";
import ImageTile from "../ImageTile/ImageTile";
import Faq from "../Faq/Faq";
import Divider from "../Divider/Divider";

import { benefits } from "../../data/homepage";

type ImageTile = {
  title: string;
  description: string;
};

const Homepage = () => {
  const { t } = useTranslation("homepage");

  return (
    <Layout variant="notLoggedIn">
      <HeroBanner />
      <ImageTileContainer>
        {/*@ts-ignore*/}
        {t("benefits", { returnObjects: true }).map(
          ({ title, description }: ImageTile, i: number) => {
            return i + 1 === benefits.length ? (
              <ImageTile
                key={title}
                title={title}
                description={description}
                imageSrc={benefits[i].imageSrc}
                imagePosition={benefits[i].imagePosition}
                imageAlt={title}
              />
            ) : (
              <React.Fragment key={t(title)}>
                <ImageTile
                  key={title}
                  title={title}
                  description={description}
                  imageSrc={benefits[i].imageSrc}
                  imagePosition={benefits[i].imagePosition}
                  imageAlt={title}
                />

                <Divider />
              </React.Fragment>
            );
          },
        )}
      </ImageTileContainer>
      <Faq />
    </Layout>
  );
};

export default Homepage;
