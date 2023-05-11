import React, { useEffect } from "react";

import Layout from "@/components/Layout/Layout";
import ImageTile from "@/components/ImageTile/ImageTile";
import ImageTileContainer from "@/components/ImageTileContainer/ImageTileContainer";
import Divider from "@/components/Divider/Divider";

import { benefits } from "../data/homepage";
import HeroBanner from "@/components/HeroBanner/HeroBanner";
import Faq from "@/components/Faq/Faq";

import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "../../slices/userSlice";

export default function Home() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

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
      {!user ? (
        <Layout variant="notLoggedIn">
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
      ) : (
        <Layout variant="notLoggedIn">
          <h1>Logged in</h1>
          <button
            className="text-white relative z-20 pt-40"
            onClick={() => signOut(auth)}
          >
            Log out
          </button>
        </Layout>
      )}
    </>
  );
}
