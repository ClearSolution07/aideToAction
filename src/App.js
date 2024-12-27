import logo from "./logo.svg";
import "./App.css";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Body from "./components/Body";
import LogIn from "./auth/LogIn";
import SignUp from "./auth/SignUp";
import MembershipForm from "./pages/home/MembershipForm";

const isAuthenticated = () => {
  // Placeholder function to check authentication.
  // Replace this with your actual authentication logic.
  return !!localStorage.getItem("authToken");
};

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: isAuthenticated() ? <Body /> : <Navigate to="/login" />,
    children: [
      {
        path: "/",
        element: <MembershipForm />,
      },
    ],
  },
  {
    path: "login",
    element: <LogIn />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
