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
import Layout from "./pages/layout/LayoutPage";

// Function to check authentication status
const isAuthenticated = () => {
    const token = localStorage.getItem("authToken");
    console.log("the token", token);
    return !!token;
};

// Protected Route Component
const ProtectedRoute = ({ element }) => {
    return isAuthenticated() ? element : <Navigate to="/" />;
};

// Layout with Protected Content
const ProtectedLayout = () => (
    <Layout>
        <Outlet />
    </Layout>
);

const router = createBrowserRouter([
    // Protected Routes (Dashboard)
    {
        path: "/dashboard",
        element: <ProtectedRoute element={<Dashboard />} />,
    },
    // Protected Routes (Others)
    {
        path: "/saarthi",
        element: <ProtectedRoute element={<ProtectedLayout />} />,
        children: [
            { path: "member", element: <Members /> },
            { path: "psychologist", element: <Psychologists /> },
            { path: "chat", element: <ChatWindow /> },
        ],
    },
    // Unprotected Routes
    { path: "/", element: <LogIn /> },
    { path: "/home", element: <Home /> },
    { path: "/register", element: <MembershipForm /> },
    { path: "*", element: <Error /> },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
