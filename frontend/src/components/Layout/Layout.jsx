import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="w-screen">{children}</main>
    </>
  );
};

export default Layout;
