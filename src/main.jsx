import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import { store } from "./redux/store";
import "./index.css";
import App from "./App.jsx";

// Define your Ant Design theme configuration
const config = {
    token: {
        colorPrimary: "#FF5C5C",
        fontFamily: "Poppins",
        borderRadius: "5px",
    },
};

// Render the app with both ConfigProvider and Redux Provider
createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <ConfigProvider theme={config}>
            <App />
        </ConfigProvider>
    </Provider>
);
