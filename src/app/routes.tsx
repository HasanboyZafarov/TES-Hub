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
import Login from "../pages/login";
import NotFound from "../pages/not-found";
import Signup from "../pages/signup";
import PrivateRoutes from "./PrivateRoutes";

// Academy routes
import Academy from "../pages/academy";
import AcademyArticles from "../pages/academy/articles/AcademyArticles";
import ArticlesDetail from "../pages/academy/articles/ArticlesDetail";
import AcademyCourses from "../pages/academy/courses/AcademyCourses";
import CourseLearn from "../pages/academy/courses/CourseLearn";
import CourseLessonDetail from "../pages/academy/courses/CourseLessonDetail";
import CourseQuiz from "../pages/academy/courses/CourseQuiz";
import CoursesDetail from "../pages/academy/courses/CoursesDetail";
import CourseCertificate from "../pages/academy/courses/CourseCertificate";

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
