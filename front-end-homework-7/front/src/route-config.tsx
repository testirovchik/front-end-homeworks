import { createBrowserRouter } from "react-router-dom";
import { SignUp } from "./pages/general/signup";
import { Login } from "./pages/general/login";
import { Profile } from "./pages/auth/profile";
import { Layout } from "./layout";
import { Settings } from "./pages/auth/settings";

export const router = createBrowserRouter([
    {path: "", element: <SignUp />},
    {path: "/login", element: <Login />},
    {
        path: "/profile",
        element: <Layout />,
        children: [
            {path: "", element: <Profile />},
            {path: "settings", element: <Settings />}
        ]
    }
])