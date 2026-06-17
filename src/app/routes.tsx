import { createBrowserRouter, Navigate } from "react-router-dom";

// Top routes
import About from "../pages/about";
import Contact from "../pages/contact";
import Home from "../pages/home";
import Privacy from "../pages/privacy";
import Resources from "../pages/resources";
import Settings from "../pages/settings";
import Terms from "../pages/terms";

// Auth Routes
import Auth from "../pages/auth";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Login from "../pages/auth/Login";
import ResetPassword from "../pages/auth/ResetPassword";
import Signup from "../pages/auth/Signup";
import VerifyEmail from "../pages/auth/VerifyEmail";
import NotFound from "../pages/not-found";
import PrivateRoutes from "./PrivateRoutes";

// Academy routes
import Academy from "../pages/academy";
import AcademyArticles from "../pages/academy/articles/AcademyArticles";
import ArticlesDetail from "../pages/academy/articles/ArticlesDetail";
import AcademyCourses from "../pages/academy/courses/AcademyCourses";
import CourseCertificate from "../pages/academy/courses/CourseCertificate";
import CourseLearn from "../pages/academy/courses/CourseLearn";
import CourseLessonDetail from "../pages/academy/courses/CourseLessonDetail";
import CourseQuiz from "../pages/academy/courses/CourseQuiz";
import CoursesDetail from "../pages/academy/courses/CoursesDetail";
import Onboarding from "../pages/auth/Onboarding";

const ACADEMY_CHILDREN = [
  {
    path: "articles",
    children: [
      { index: true, element: <AcademyArticles /> },
      { path: ":slug", element: <ArticlesDetail /> },
    ],
  },
  {
    path: "courses",
    children: [
      { index: true, element: <AcademyCourses /> },
      { path: ":slug", element: <CoursesDetail /> },
      { path: ":slug/learn", element: <CourseLearn /> },
      { path: ":slug/learn/:lessonId", element: <CourseLessonDetail /> },
      { path: ":slug/quiz/:quizId", element: <CourseQuiz /> },
      { path: ":slug/certificate", element: <CourseCertificate /> },
    ],
  },
];

const AUTH_CHILDREN = [
  { index: true, element: <Navigate to="/auth/signup" replace /> },
  { path: "signup", element: <Signup /> },
  { path: "login", element: <Login /> },
  { path: "verify-email", element: <VerifyEmail /> },
  { path: "forgot-password", element: <ForgotPassword /> },
  { path: "reset-password", element: <ResetPassword /> },
  { path: "onboarding", element: <Onboarding /> },
];

const TOP_ROUTES = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
  { path: "/terms", element: <Terms /> },
  { path: "/privacy", element: <Privacy /> },
  { path: "/academy", element: <Academy />, children: ACADEMY_CHILDREN },
  { path: "*", element: <NotFound /> },
];

const PUBLIC_ROUTES = [
  {
    path: "/auth",
    element: <Auth />,
    children: AUTH_CHILDREN,
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
