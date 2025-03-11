import { useState, useEffect } from "react";
import { Breadcrumb, Layout, Drawer } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { RiMenu2Fill } from "react-icons/ri";

const { Header, Content, Footer, Sider } = Layout;

const Main = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  const location = useLocation();

  // Generate breadcrumb items
  const generateBreadcrumbItems = () => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    return [
      { title: "Dashboard", href: "/" },
      ...pathnames.map((value, index) => {
        const url = `/${pathnames.slice(0, index + 1).join("/")}`;
        return {
          title: value.charAt(0).toUpperCase() + value.slice(1),
          href: url,
        };
      }),
    ];
  };

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Layout>
      {/* Header */}
      <Header className="bg-white sticky top-0 z-10 w-full flex items-center shadow-md">
        <div className="flex items-center w-full px-4">
          {!isLargeScreen && (
            <button
              onClick={toggleDrawer}
              className="lg:hidden mr-4 p-2 rounded text-black border border-gray-300"
            >
              <RiMenu2Fill />
            </button>
          )}
          <Navbar />
        </div>
      </Header>

      <Layout>
        {isLargeScreen && (
          <Sider
            className="hidden lg:block h-screen fixed left-0 top-16"
            width={250}
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0,
              top: 64,
              backgroundColor: "#fff",
            }}
          >
            <Sidebar />
          </Sider>
        )}

        <Drawer
          title="Navigation"
          placement="left"
          onClose={toggleDrawer}
          open={drawerVisible}
          bodyStyle={{ padding: 0 }}
        >
          <Sidebar />
        </Drawer>

        <Layout
          style={{
            marginLeft: isLargeScreen ? 250 : 0,
          }}
        >
          <Content className="px-4 lg:px-6 py-4">
            <div className="flex justify-between">
              <Breadcrumb className="m-4">
                {generateBreadcrumbItems().map((item, index) => (
                  <Breadcrumb.Item key={index}>
                    <Link
                      className="text-base lg:text-lg text-black"
                      to={item.href}
                    >
                      {item.title}
                    </Link>
                  </Breadcrumb.Item>
                ))}
              </Breadcrumb>
            </div>

            <div
              className="min-h-[380px] p-4 bg-white rounded-lg shadow-md"
              style={{ background: "#fff" }}
            >
              <Outlet />
            </div>
          </Content>

          <Footer className="text-center bg-gray-50 py-4">
            Prep Services FBA ©{new Date().getFullYear()} Created by Md Shifat
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Main;
