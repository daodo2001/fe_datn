import React, { useRef, useState } from "react";
import { Redirect } from "react-router";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../../../services/auth.service";

import { authentication } from "./isAuthen";
import QuenMatKhau from "./QuenMatKhau";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                Không được bỏ trống!
            </div>
        );
    }
};

function Login(props) {
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {

            AuthService.login(username, password).then(
                () => {
                    if (localStorage.getItem("user")) {
                        const user = JSON.parse(localStorage.getItem("user"));
                        if (user.roles.includes("ROLE_STAFF")
                        ) {
                            props.history.push("/admin/dondat");
                        } else {
                            props.history.push("/admin");
                        }
                    }
                    window.location.reload();
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setLoading(false);
                    setMessage(resMessage);
                }
            );
        } else {
            setLoading(false);
        }
    };
    const [isModalVisible, setIsModalVisible] = useState(false)

    if (authentication.isAuthenticationUser()) {
        return <Redirect to="/" />
    } else if (authentication.isAuthentication()) {
        return <Redirect to="/admin" />
    }

    return (
        <div>
            <div className="auth-fluid">
                <div className="auth-fluid-form-box">
                    <div className="align-items-center d-flex h-100">
                        <div className="card-body">
                            <div className="auth-brand text-center text-lg-start">
                                <a href="index.html" className="logo-dark">
                                    <span>
                                        <img
                                            src="assets/images/logo-dark.png"
                                            alt=""
                                            height={18}
                                        />
                                    </span>
                                </a>
                                <a href="index.html" className="logo-light">
                                    <span>
                                        <img
                                            src="assets/images/logo.png"
                                            alt=""
                                            height={18}
                                        />
                                    </span>
                                </a>
                            </div>
                            <h4 className="mt-0">Sign In</h4>
                            <p className="text-muted mb-4">
                                Enter your username and password to access
                                account.
                            </p>
                            <Form onSubmit={handleLogin} ref={form}>
                                <div className="mb-3">
                                    <label
                                        htmlFor="emailaddress"
                                        className="form-label"
                                    >
                                        Username
                                    </label>
                                    <Input
                                        className="form-control"
                                        name="username"
                                        value={username}
                                        onChange={onChangeUsername}
                                        validations={[required]}
                                        placeholder="Enter your username..."
                                    />
                                </div>
                                <div className="mb-3">
                                    <a
                                        onClick={() => setIsModalVisible(true)}
                                        href="#!"
                                        className="text-muted float-end"
                                    >
                                        <small>Forgot your password?</small>
                                    </a>

                                    <label
                                        htmlFor="password"
                                        className="form-label"
                                    >
                                        Password
                                    </label>
                                    <Input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={password}
                                        onChange={onChangePassword}
                                        validations={[required]}
                                        placeholder="Enter your password..."
                                    />
                                </div>

                                <div className="d-grid mb-0 text-center">
                                    <button
                                        className="btn btn-primary btn-block"
                                        disabled={loading}
                                    >
                                        {loading && (
                                            <span className="spinner-border spinner-border-sm"></span>
                                        )}
                                        <i className="mdi mdi-login" />
                                        Login
                                    </button>
                                </div>
                                {message && (
                                    <div className="form-group">
                                        <div
                                            className="alert alert-danger"
                                            role="alert"
                                        >
                                            {message}
                                        </div>
                                    </div>
                                )}
                                <CheckButton
                                    style={{ display: "none" }}
                                    ref={checkBtn}
                                />
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
            <QuenMatKhau isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
        </div>
    );
}

export default Login;
