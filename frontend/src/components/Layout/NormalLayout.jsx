import Header from "./Header";

const NormalLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="w-screen">{children}</main>
    </>
  );
};

export default NormalLayout;