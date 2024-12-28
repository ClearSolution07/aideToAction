import React from "react";
import { createRoot } from "react-dom/client";
import { ConfigProvider, theme } from "antd";
import "./index.css";
import App from "./App.jsx";

// Define your theme configuration
const config = {
  token: {
    colorPrimary: "#facc15",
    fontFamily: "Poppins",
  },
};

createRoot(document.getElementById("root")).render(
  <ConfigProvider theme={config}>
    <App />
  </ConfigProvider>
);
