import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer/Footer";

export const LayoutPage = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
