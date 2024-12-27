import React, { useState } from "react";
import {
  signupImage,
  logoImage,
  rightYellow,
  leftYellow,
  googleIcon,
} from "../utils/imageUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import "./login.css";
import { Link } from "react-router-dom";

const SingUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="overContainer">
      <div className="login-container">
        <div className="rightCorner">
          <img src={rightYellow} alt="rightCorner" />
        </div>

        <div
          className="login-card"
          style={{ display: "flex", width: "100vw", flexDirection: "column" }}
        >
          <div
            style={{
              display: "flex",
              width: "80vw",
              justifyContent: "end",
              position: "absolute",
            }}
          >
            <img src={logoImage} alt="logoSarthi" />
          </div>
          <div style={{ display: "flex" }}>
            <div
              className="loginImage"
              style={{
                width: "60vw",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img src={signupImage} alt="loginImage" />
            </div>

            <div
              style={{
                width: "30vw",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <div style={{ marginTop: "2rem" }}>
                <h2 className="login-title">Join us Now!!</h2>
                <span>Let's Create your account</span>
              </div>

              <div className="login-form">
                <div className="input-container">
                  <span>Full Name</span>
                  <input
                    type="name"
                    placeholder="enter your name"
                    className="login-input"
                  />
                </div>
                <div className="input-container">
                  <span>Email</span>
                  <input
                    type="email"
                    placeholder="abc123@gmail.com"
                    className="login-input"
                  />
                </div>
                <div
                  style={{
                    position: "relative",
                  }}
                >
                  <div className="input-container psswd">
                    <span>Password</span>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="enter your password"
                      className="login-input"
                    />
                    <span
                      className="eye-icon"
                      onClick={togglePasswordVisibility}
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                      />
                    </span>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <button className="login-button">Sign up</button>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{ borderTop: "1px solid #ddd", width: "4rem" }}
                  ></div>
                  <div style={{ color: "#ddd" }}>OR</div>
                  <div
                    style={{ borderTop: "1px solid #ddd", width: "4rem" }}
                  ></div>
                </div>

                <button className="google-button">
                  <img src={googleIcon} alt="google_icon" />
                  Continue with Google
                </button>
                <div className="login-options">
                  <span href="#" className="login-link">
                    Already have an Account?{" "}
                    <Link
                      to="/login"
                      style={{
                        color: "#444",
                        cursor: "pointer",
                        textDecoration: "none",
                      }}
                    >
                      Sign-in
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="leftCorner">
          <img src={leftYellow} alt="lefttCorner" />
        </div>
      </div>
    </div>
  );
};

export default SingUp;
