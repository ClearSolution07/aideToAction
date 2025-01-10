import "./App.css";
import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from "react-router-dom";

import LogIn from "./pages/auth/LogIn";
import Dashboard from "./pages/home/Dashboard";
import MembershipForm from "./pages/auth/MembershipForm";
import Error from "./pages/Error";
import ChatWindow from "./pages/chat/chat";
import Members from "./pages/members/Members";

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

// Define Routes
const router = createBrowserRouter([
    {
        path: "/dashboard",
        element: <ProtectedRoute element={<Dashboard />} />,
    },
    {
        path: "/member",
        // element: isAuthenticated() ? <Body /> : <Navigate to="/login" />,/
        element: <Members />,
    },
    {
        path: "/chat",
        element: <ProtectedRoute element={<ChatWindow />} />,
    },
    {
        path: "/",
        element: <LogIn />,
    },
    {
        path: "/register",
        element: <MembershipForm />,
    },
    {
        path: "*",
        element: <Error />,
    },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
