import { createRoot } from "react-dom/client";
import { ConfigProvider } from "antd";
import "./index.css";
import App from "./App.jsx";

// Define your theme configuration
const config = {
    token: {
        colorPrimary: "#FF5C5C",
        fontFamily: "Poppins",
        borderRadius: "5px",
    },
};

createRoot(document.getElementById("root")).render(
    <ConfigProvider theme={config}>
        <App />
    </ConfigProvider>
);
