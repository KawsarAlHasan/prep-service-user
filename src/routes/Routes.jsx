import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import DashBoard from "../pages/DashBoard";
import Overview from "../pages/investment/Overview";
import SendInventory from "../pages/investment/SendInventory";
import ProductReturn from "../pages/ProductReturn";
import Prep from "../pages/Prep";
import BillOverview from "../pages/billing/BillOverview";
import Payment from "../pages/billing/Payment";
import Rates from "../pages/Rates";
import Report from "../pages/Report";
import Settings from "../pages/Settings";
import Login from "../components/Login";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Main />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <DashBoard />,
      },
      {
        path: "/overview",
        element: <Overview />,
      },
      {
        path: "/sendinventory",
        element: <SendInventory />,
      },
      {
        path: "/productReturn",
        element: <ProductReturn />,
      },
      {
        path: "/prep",
        element: <Prep />,
      },
      {
        path: "/billingOverview",
        element: <BillOverview />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/rates",
        element: <Rates />,
      },
      {
        path: "/reports",
        element: <Report />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
]);
