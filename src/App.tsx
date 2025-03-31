import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout";
import LoginPage from "./pages/Login";
import NotfoundPage from "./pages/Notfound";
import SigninPage from "./pages/SIgnin";
import HomePage from "./pages/Home";
import WeatherPage from "./pages/Weather";
import TimerPage from "./pages/Timer";

const App = () => {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/login",
          element: <LoginPage />,
          errorElement: <NotfoundPage />,
        },
        {
          path: "/signin",
          element: <SigninPage />,
          errorElement: <NotfoundPage />,
        },
        {
          path: "/",
          element: <HomePage />,
          errorElement: <NotfoundPage />,
        },
        {
          path: "/weather",
          element: <WeatherPage />,
          errorElement: <NotfoundPage />,
        },
        {
          path: "/timer",
          element: <TimerPage />,
          errorElement: <NotfoundPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
