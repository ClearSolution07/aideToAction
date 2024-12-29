import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {
    loginImage,
    logoImage,
    rightYellow,
    leftYellow,
    googleIcon,
} from "../utils/imageUtils";

import "./login.css";
import {Link, useNavigate} from "react-router-dom";

const LogIn = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [is_mobile_width, set_is_mobile_width] = useState(false);
    const [password_val, set_password_val] = useState('');
    const [email_val, set_email_val] = useState('');


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        const width = document.body.clientWidth;
        if (width < 1024) {
            set_is_mobile_width(true);
        } else {
            set_is_mobile_width(false);
        }
    }, []);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-container">
            {!is_mobile_width ? <div className="leftSection">
                <div className="loginImage">
                    <img src={loginImage} alt="loginImage"/>
                </div>
                <div className="leftCorner">
                    <img src={leftYellow} alt="leftCorner"/>
                </div>
            </div> : null}
            <div className={is_mobile_width ? "overallSection" : "rightSection"}>
                <div className="logoImage">
                    <img src={logoImage} alt="logoSarthi"/>
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
                                value={email_val}
                                onChange={(ev) => {
                                    set_email_val(ev.target.value)
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
                                    placeholder="enter your password"
                                    className="login-input"
                                    value={password_val}
                                    onChange={(ev) => {
                                        set_password_val(ev?.target?.value);
                                    }}
                                />
                                <span
                                    className="eye-icon"
                                    onClick={togglePasswordVisibility}
                                >
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye}/>
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
                        <button className="login-button" onClick={() => {
                            navigate('/dashboard')
                        }}>Sign in</button>
                        <div className="loginOptions" onClick={() => {
                            navigate('/register')
                        }}>
                            <span href="#" className="login-link">
                                Didn't have an Account? &nbsp;
                                <Link
                                    to="/register"
                                    style={{
                                        color: "blue",
                                        cursor: "pointer",
                                        textDecoration: "none",
                                    }}
                                >
                                    Register now
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {
                !is_mobile_width ? <div className="rightCorner">
                    <img src={rightYellow} alt="rightCorner"/>
                </div> : null
            }

            {!is_mobile_width ? <div className="leftCorner">
                <img src={leftYellow} alt="leftCorner"/>
            </div> : null}
        </div>
    );
};

export default LogIn;
