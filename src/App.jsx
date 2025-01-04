import "./App.css";

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import LogIn from "./auth/LogIn";
import Dashboard from "./pages/home/Dashboard";
import MembershipForm from "./auth/MembershipForm";
import Error from "./pages/Error";
import ChatWindow from "./pages/chat/chat";

// const isAuthenticated = () => {
//   // Placeholder function to check authentication.
//   // Replace this with your actual authentication logic.
//   return !!localStorage.getItem("authToken");
// };

// const ProtectedRoute = ({ element }) => {
//   return isAuthenticated() ? element : <Navigate to="/login" />;
// };

const router = createBrowserRouter([
    {
        path: "/dashboard",
        // element: isAuthenticated() ? <Body /> : <Navigate to="/login" />,/
        element: <Dashboard />,
    },
    {
        path: "/chat",
        // element: isAuthenticated() ? <Body /> : <Navigate to="/login" />,/
        element: <ChatWindow />,
    },
    {
        path: "/",
        element: <LogIn />,
    },
    {
        path: "register",
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
