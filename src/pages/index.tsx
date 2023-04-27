import React from "react";

import Layout from "@/components/Layout/Layout";
import ImageTile from "@/components/ImageTile/ImageTile";
import ImageTileContainer from "@/components/ImageTileContainer/ImageTileContainer";
import Divider from "@/components/Divider/Divider";

import { benefits } from "../data/homepage";
import HeroBanner from "@/components/HeroBanner/HeroBanner";
import Faq from "@/components/Faq/Faq";

export default function Home() {
  return (
    <Layout>
      <HeroBanner />
      <ImageTileContainer>
        {benefits.map((data, i) => {
          const { title, description, imageSrc, imagePosition, imageAlt } =
            data;

          return i + 1 === benefits.length ? (
            <ImageTile
              key={title}
              title={title}
              description={description}
              imageSrc={imageSrc}
              imagePosition={imagePosition}
              imageAlt={imageAlt}
            />
          ) : (
            <React.Fragment key={title}>
              <ImageTile
                key={title}
                title={title}
                description={description}
                imageSrc={imageSrc}
                imagePosition={imagePosition}
                imageAlt={imageAlt}
              />

              <Divider />
            </React.Fragment>
          );
        })}
      </ImageTileContainer>
      <Faq />
    </Layout>
  );
}
