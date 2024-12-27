import React from "react";

const Error = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <a href="/" style={{ textDecoration: "none", color: "blue" }}>
        Go to Home
      </a>
    </div>
  );
};

export default Error;
