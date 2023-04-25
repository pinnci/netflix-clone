import Header from "../Header/Header";
/*import Footer from "../Footer/Footer";*/

type Layout = React.ComponentProps<"div">;

const Layout: React.FC<Layout> = ({ children, ...other }) => {
  return (
    <div className="page relative" {...other}>
      <Header />
      {children}
      {/*<Footer />*/}
    </div>
  );
};

export default Layout;
