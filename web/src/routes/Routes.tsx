import { createBrowserRouter } from "react-router-dom";
// import HomePage from "../pages/HomePage";
import PageNotFound from "../pages/PageNotFound";
import FirebaseLoginPage from "../pages/FirebaseLoginPage";
import ProtectedDashboardPage from "../pages/ProtectedDashboardPage";
import DashboardMainPage from "../pages/DashboardMainPage";
import UserManagementPage from "../pages/UserManagementPage";
import UserDetailPage from "../pages/UserDetailPage";

export const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <HomePage />,
  //   index: true,
  // },
  {
    path: "/",
    element: <FirebaseLoginPage />,
    index: true,
  },
  {
    path: "/dashboard",
    element: <ProtectedDashboardPage />,
    children: [
      {
        index: true,
        element: <DashboardMainPage />,
      },
      {
        path: "user-management",
        element: <UserManagementPage />,
      },
      {
        path: "user-management/:id/detail",
        element: <UserDetailPage />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
  // {
  //   path: "/unauthorized",
  //   element: <UnauthorizedPage />,
  // },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
