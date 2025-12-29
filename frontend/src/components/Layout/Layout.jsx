import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";

const Layout = ({ children }) => {
  return (
    <>
      <Header />

      {/* Flex wrapper under the header */}
      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-neutral-900">
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
