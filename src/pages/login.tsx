import Image from "next/image";

import Container from "@/components/Container/Container";
import Layout from "../components/Layout/Layout";
import LoginForm from "../components/LoginForm/LoginForm";

import { loginForm } from "../data/login";

const Login = () => {
  const { imageSrc, imageAlt } = loginForm;

  return (
    <Layout variant="login">
      <div className="loginForm__gradient absolute w-full min-h-full"></div>
      <div className="loginForm__imageContainer absolute w-full h-full">
        <Image
          src={imageSrc}
          className="loginForm__image object-cover object-left"
          alt={imageAlt}
          fill
        />
      </div>
      <Container className="sm:grow relative flex justify-center">
        <LoginForm />
      </Container>
    </Layout>
  );
};

export default Login;
