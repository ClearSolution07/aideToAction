import "./App.css";
import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from "react-router-dom";

import Home from "./pages/auth/Home";
import MembershipForm from "./pages/auth/MembershipForm";
import Error from "./pages/Error";
import Profile from "./pages/profile/Profile";
import Layout from "./pages/layout/LayoutPage";
import Admin from "./pages/Admin/Admin";

import AdminProtectedRoute from "./components/AdminProtectedRoute";

const isAuthenticated = () => {
    const token = localStorage.getItem("authToken");
    console.log('==============token======', token)
    return !!token;
};

const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/register", element: <MembershipForm /> },
    {
        path: "/dashboard",
        element: <Layout /> ,
        children: [
            { path: "profile", element: <Profile /> },
            {
                path: "admin",
                element: <AdminProtectedRoute element={<Admin />} />,
            },
        ],
    },
    { path: "*", element: <Error /> },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
