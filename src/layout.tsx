import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <ToastContainer />
    </div>
  );
};

export default Layout;
