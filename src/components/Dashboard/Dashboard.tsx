import Layout from "../Layout/Layout";
import Container from "../Container/Container";
import DashboardBanner from "../DashboardBanner/DashboardBanner";
import DashboardCategoriesContainer from "../DashboardCategoriesContainer/DashboardCategoriesContainer";

const Dashboard = () => {
  return (
    <Layout variant="loggedIn">
      <DashboardBanner />
      <Container className="py-6">
        <DashboardCategoriesContainer />
      </Container>
    </Layout>
  );
};

export default Dashboard;
