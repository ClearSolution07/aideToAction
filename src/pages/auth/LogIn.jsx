import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { loginImage1, logoImage } from "../../utils/imageUtils";
import { message } from "antd";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const LogIn = () => {
    const navigate = useNavigate();
    const { loading, error, handleLogin } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [isMobileWidth, setIsMobileWidth] = useState(false);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const width = document.body.clientWidth;
        if (width < 1024) {
            setIsMobileWidth(true);
        } else {
            setIsMobileWidth(false);
        }
    }, []);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSignIn = async () => {
        try {
            const response = await handleLogin(email, password);
            if (response.statuscode === 200) {
                localStorage.setItem("authToken", response.data.access_token);
                localStorage.setItem("userId", response.data.user_id);
                navigate("/dashboard");
            } else {
                console.error("Error:", response.message);
                message.error(`Error : ${response.message}`);
            }
        } catch (err) {
            console.error("Login failed:", err.message);
            message.error(`Login Failed : ${response.message}`);
        }
    };

    return (
        <div className={"rightSectionContainer"}>
            <div className="logoImage">
                <img src={logoImage} alt="logoSarthi" />
            </div>
            <div className="formContainer">
                <div className="titleSection">
                    <div className="loginTitle">Welcome</div>
                    <span>Please login your account</span>
                </div>
                <div className="loginForm">
                    <div className="inputContainer">
                        <span>Email</span>
                        <input
                            type="email"
                            placeholder="Enter your email Id"
                            className="login-input"
                            autoComplete="email"
                            value={email}
                            onChange={(ev) => {
                                setEmail(ev.target.value);
                            }}
                            autoFocus={true}
                        />
                    </div>
                    <div
                        style={{
                            marginTop: "28px",
                            marginBottom: "28px",
                        }}
                    >
                        <div className="inputContainer password">
                            <span>Password</span>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="login-input"
                                value={password}
                                onChange={(ev) => {
                                    setPassword(ev?.target?.value);
                                }}
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
                {error && <div className="error-message">{error}</div>}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                    }}
                >
                    <button
                        className="login-button"
                        onClick={handleSignIn}
                        disabled={loading}
                    >
                        {loading ? "Signing in..." : "Sign in"}
                    </button>
                    <div
                        className="loginOptions"
                        onClick={() => navigate("/register")}
                    >
                        <span className="login-link">
                            Don't have an account? &nbsp;
                            <Link
                                to="/register"
                                style={{
                                    color: "blue",
                                    cursor: "pointer",
                                    textDecoration: "none",
                                }}
                            >
                                SignUp
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogIn;
