import "./App.css";
import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
    Outlet,
} from "react-router-dom";

import Home from "./pages/auth/Home";
import LogIn from "./pages/auth/LogIn";
import Dashboard from "./pages/home/Dashboard";
import MembershipForm from "./pages/auth/MembershipForm";
import Error from "./pages/Error";
import ChatWindow from "./pages/chat/chat";
import Members from "./pages/members/Members";
import Psychologists from "./pages/psychologists/Psychologists";
import Profile from "./pages/profile/Profile";
import Layout from "./pages/layout/LayoutPage";
import Admin from "./pages/Admin/Admin";

// Function to check authentication status
const isAuthenticated = () => {
    const token = localStorage.getItem("authToken");
    return !!token;
};

// Protected Route Component
const ProtectedRoute = ({ element }) => {
    return isAuthenticated() ? element : <Navigate to="/" />;
};

const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/register", element: <MembershipForm /> },
    { path: "/admin", element: <Admin /> },
    {
        path: "/dashboard",
        element: <ProtectedRoute element={<Layout />} />,
        children: [
            { path: "", element: <Dashboard /> },
            { path: "profile", element: <Profile /> },
        ],
    },
    { path: "*", element: <Error /> },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
