import { createBrowserRouter } from "react-router-dom";

// Layout
import Layout from "../components/layout/Layout";

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
import ResetPassword from "../pages/auth/ResetPassword";
import VerifyEmail from "../pages/auth/VerifyEmail";
import NotFound from "../pages/not-found";
import PrivateRoutes from "./PrivateRoutes";
import RouteError from "../components/layout/RouteError";

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

// Community routes
import Community from "../pages/community";
import AuthorProfile from "../pages/community/author";
import Photos from "../pages/community/photos";
import Questions from "../pages/community/questions";
import QuestionDetail from "../pages/community/questions/QuestionDetail";
import RegionalFeed from "../pages/community/region";
import Stories from "../pages/community/stories";
import StoriesDetail from "../pages/community/stories/StoriesDetail";
import Topics from "../pages/community/topic";

// Session routes
import Sessions from "../pages/sessions";
import SessionCheckout from "../pages/sessions/SessionCheckout";
import SessionDetail from "../pages/sessions/SessionDetail";
import SessionRegister from "../pages/sessions/SessionRegister";
import SessionRegisterConfirmation from "../pages/sessions/SessionRegisterConfirmation";
import TopicDetail from "../pages/community/topic/TopicDetail";
import Profile from "../pages/profile";

const TOP_ROUTES = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
  { path: "/terms-of-use", element: <Terms /> },
  { path: "/privacy-policy", element: <Privacy /> },
  { path: "/profile/:id", element: <Profile /> },
  { path: "/profile/", element: <Profile /> },
  { path: "*", element: <NotFound /> },
];

const PUBLIC_ROUTES = [
  { path: "/community", element: <Community /> },
  { path: "/academy", element: <Academy /> },
];

const AUTH_ROUTES = [
  { path: "/auth", element: <Auth /> },
  { path: "/auth/verify-email", element: <VerifyEmail /> },
  { path: "/auth/forgot-password", element: <ForgotPassword /> },
  { path: "/auth/reset-password", element: <ResetPassword /> },
  { path: "/auth/onboarding", element: <Onboarding /> },
];

const ACADEMY_ROUTES = [
  // Articles
  { path: "/academy", element: <Academy /> },
  { path: "/academy/articles", element: <AcademyArticles /> },
  { path: "/academy/articles/:slug", element: <ArticlesDetail /> },

  // Courses

  { path: "/academy/courses", element: <AcademyCourses /> },
  { path: "/academy/courses/:slug", element: <CoursesDetail /> },
  { path: "/academy/courses/:slug/learn", element: <CourseLearn /> },
  {
    path: "/academy/courses/:slug/learn/:lessonId",
    element: <CourseLessonDetail />,
  },
  { path: "/academy/courses/:slug/quiz/:quizId", element: <CourseQuiz /> },
  {
    path: "/academy/courses/:slug/certificate",
    element: <CourseCertificate />,
  },
];

const COMMUNITY_ROUTES = [
  // Stories
  {
    path: "/community/stories",
    element: <Stories />,
  },
  { path: "/community/stories/:slug", element: <StoriesDetail /> },

  // Questions
  { path: "/community/questions", element: <Questions /> },
  { path: "/community/questions/:slug", element: <QuestionDetail /> },

  // Photos
  { path: "/community/photos", element: <Photos /> },

  // Topic
  { path: "/community/topics", element: <Topics /> },
  { path: "/community/topics/:topicSlug", element: <TopicDetail /> },

  // Regional feed
  { path: "/community/region/:regionSlug", element: <RegionalFeed /> },

  // Public author profile
  { path: "/community/author/:username", element: <AuthorProfile /> },
];

const SESSION_ROUTES = [
  { path: "/sessions", element: <Sessions /> },
  { path: "/sessions/:slug", element: <SessionDetail /> },
  { path: "/sessions/:slug/register", element: <SessionRegister /> },
  { path: "/sessions/:slug/checkout", element: <SessionCheckout /> },
  {
    path: "/sessions/:slug/confirmation",
    element: <SessionRegisterConfirmation />,
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
  {
    element: <Layout />,
    errorElement: <RouteError />,
    children: [
      ...TOP_ROUTES,
      ...PUBLIC_ROUTES,
      ...ACADEMY_ROUTES,
      ...COMMUNITY_ROUTES,
      ...SESSION_ROUTES,
      ...PRIVATE_ROUTES,
    ],
  },
  ...AUTH_ROUTES.map((route) => ({ ...route, errorElement: <RouteError /> })),
]);

export default routes;
