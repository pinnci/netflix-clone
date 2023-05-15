import React from "react";

import Layout from "../Layout/Layout";
import HeroBanner from "../HeroBanner/HeroBanner";
import ImageTileContainer from "../ImageTileContainer/ImageTileContainer";
import ImageTile from "../ImageTile/ImageTile";
import Faq from "../Faq/Faq";
import Divider from "../Divider/Divider";

import { benefits } from "../../data/homepage";

const Homepage = () => {
  return (
    <Layout variant="notLoggedIn">
      <HeroBanner />
      <ImageTileContainer>
        {benefits.map((data, i) => {
          const { title, description, imageSrc, imagePosition } = data;

          return i + 1 === benefits.length ? (
            <ImageTile
              key={title}
              title={title}
              description={description}
              imageSrc={imageSrc}
              imagePosition={imagePosition}
              imageAlt={title}
            />
          ) : (
            <React.Fragment key={title}>
              <ImageTile
                key={title}
                title={title}
                description={description}
                imageSrc={imageSrc}
                imagePosition={imagePosition}
                imageAlt={title}
              />

              <Divider />
            </React.Fragment>
          );
        })}
      </ImageTileContainer>
      <Faq />
    </Layout>
  );
};

export default Homepage;
