import Layout from "@/components/Layout/Layout";
import ImageTile from "@/components/ImageTile/ImageTile";
import ImageTileContainer from "@/components/ImageTileContainer/ImageTileContainer";
import Divider from "@/components/Divider/Divider";

import { benefits } from "../data/homepage";

export default function Home() {
  return (
    <Layout>
      <h1>Unlimited movies, TV shows, and more</h1>
      <ImageTileContainer>
        {benefits.map((data, i) => {
          const { title, description, imageSrc, imagePosition, imageAlt } =
            data;

          return i + 1 === benefits.length ? (
            <ImageTile
              key={i}
              title={title}
              description={description}
              imageSrc={imageSrc}
              imagePosition={imagePosition}
              imageAlt={imageAlt}
            />
          ) : (
            <>
              <ImageTile
                key={i}
                title={title}
                description={description}
                imageSrc={imageSrc}
                imagePosition={imagePosition}
                imageAlt={imageAlt}
              />

              <Divider />
            </>
          );
        })}
      </ImageTileContainer>
    </Layout>
  );
}
