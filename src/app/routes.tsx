import { createBrowserRouter, Navigate } from "react-router-dom";

import About from "../pages/about";
import Auth from "../pages/auth";
import Contact from "../pages/contact";
import Home from "../pages/home";
import Privacy from "../pages/privacy";
import Terms from "../pages/terms";
import Settings from "../pages/settings";
import Academy from "../pages/academy";

import PrivateRoutes from "./PrivateRoutes";
import Resources from "../pages/resources";
import Signup from "../pages/signup";
import Login from "../pages/login";
import NotFound from "../pages/not-found";

const TOP_ROUTES = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
  { path: "/terms", element: <Terms /> },
  { path: "/privacy", element: <Privacy /> },
  { path: "/academy", element: <Academy /> },
  { path: "*", element: <NotFound /> },
];

const PUBLIC_ROUTES = [
  {
    path: "/auth",
    element: <Auth />,
    children: [
      { index: true, element: <Navigate to="/auth/login" replace /> },
      { path: "signup", element: <Signup /> },
      { path: "login", element: <Login /> },
    ],
  },
];

const PRIVATE_ROUTES = [
  {
    element: <PrivateRoutes />,
    children: [
      { path: "/settings", element: <Settings /> },
      { path: "/resources", element: <Resources /> },
    ],
  },
];

const routes = createBrowserRouter([
  ...TOP_ROUTES,
  ...PUBLIC_ROUTES,
  ...PRIVATE_ROUTES,
]);

export default routes;
