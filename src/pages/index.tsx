import React, { useEffect } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Homepage from "../components/Homepage/Homepage";
import Dashboard from "@/components/Dashboard/Dashboard";

import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
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
    <React.Fragment>{!user ? <Homepage /> : <Dashboard />}</React.Fragment>
  );
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["homepage"])),
    },
  };
}
