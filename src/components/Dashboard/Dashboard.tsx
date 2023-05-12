import Layout from "../Layout/Layout";
import Container from "../Container/Container";

import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

const Dashboard = () => {
  return (
    <Layout variant="notLoggedIn">
      <Container>
        <button
          className="text-white relative z-20 pt-40"
          onClick={() => signOut(auth)}
        >
          Log out
        </button>
      </Container>
    </Layout>
  );
};

export default Dashboard;
