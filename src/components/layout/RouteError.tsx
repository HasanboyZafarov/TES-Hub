import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router-dom";

const RouteError = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  const message = isRouteErrorResponse(error)
    ? error.statusText
    : error instanceof Error
      ? error.message
      : "Something went wrong.";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-2xl font-semibold text-[#191C1B]">
        Something went wrong
      </h1>
      <p className="max-w-md text-[#414844]">{message}</p>
      <button
        className="rounded-md bg-[#012D1D] px-4 py-2 text-white"
        onClick={() => navigate("/")}
      >
        Back to home
      </button>
    </div>
  );
};

export default RouteError;
