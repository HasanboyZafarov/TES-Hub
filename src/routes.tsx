import { createBrowserRouter } from "react-router-dom";

import Home from "./components/pages/Home";

const routes = createBrowserRouter([
    {path: '/', element:<Home/>}
])