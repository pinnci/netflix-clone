import Container from "@/components/Container/Container";
import Layout from "../components/Layout/Layout";
import LoginForm from "../components/LoginForm/LoginForm";

const Login = () => {
  return (
    <Layout variant="login">
      <div className="loginForm__image absolute min-h-screen w-full h-full"></div>
      <Container className="sm:grow relative flex justify-center">
        <LoginForm />
      </Container>
    </Layout>
  );
};

export default Login;
