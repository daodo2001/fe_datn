import React, { useState } from 'react';
import "../register/register.css";
import { Button, Form, Input, notification } from 'antd';
import authService from '../../services/auth.service';

function Register(props) {
    const { setIsModalVisibleRegister } = props
    const [message, setMessage] = useState("");
    const [form] = Form.useForm();
    const [signUpRequest, setSignUpRequest] = useState({

    })

    const handleCancel = () => {
        form.resetFields();
        setIsModalVisibleRegister(false)
        setMessage("")
    }

    const onChange = (event) => {
        const target = event.target;
        let name = target.name;
        let value = target.type === "checkbox" ? target.checked : target.value;
        setSignUpRequest({ ...signUpRequest, [name]: value })
    };

    const onFinish = () => {
        const { username, email, password } = signUpRequest;

        authService.register(username, email, password).then(
            (response) => {
                notification["success"]({
                    message: response.data.message,
                });
                setMessage("")
                form.resetFields();
                setIsModalVisibleRegister(false)
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage);
            }
        )

    };
    return (
        <div className=" container-register " align='center'>
            <div className="close-register">
                <i style={{ fontSize: '30px' }} className="fas fa-times" onClick={handleCancel}></i>
            </div>
            <Form form={form} onFinish={onFinish}>
                <div className="main-register" align='center'>
                    <div className="main-register-title" align="center">Đăng ký</div>
                    <div className="main-register-button FB">
                        <i className="fab fa-facebook" style={{ fontSize: '20px' }}></i>
                        <span className="text-fb-gg">Đăng ký bằng Facebook</span>

                    </div>
                    <div className="main-register-button GG">
                        <i className="fab fa-google" style={{ fontSize: '20px' }}></i>
                        <span className="text-fb-gg">Đăng ký bằng Google</span>
                    </div>
                    <div style={{
                        marginTop: '20px',
                    }}></div>

                    <Form.Item key={1} name="username" rules={[
                        {
                            required: true,
                            message: 'Không được bỏ trống tên tài khoản!',
                        },
                        {
                            validator(_, value) {

                                if (!value || (value.length >= 6 && value.length <= 20)) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Tối thiểu 6 hoặc tối đa 20 ký tự');
                            },
                        },
                    ]}>
                        <Input style={{

                            borderRadius: "8px",
                            textTransform: "none",

                            height: 45,
                        }} name='username' onChange={onChange} placeholder="Nhập tên tài khoản..." />
                    </Form.Item>

                    <Form.Item key={2} name="email" rules={[
                        {
                            required: true,
                            message: 'Không được bỏ trống email!',
                        },
                        {
                            type: 'email',
                            message: 'Không đúng định dạng E-mail!',
                        },
                    ]}>
                        <Input style={{
                            borderRadius: "8px",
                            textTransform: "none",
                            width: "100%",
                            height: 45,
                        }} name='email' onChange={onChange} placeholder="Nhập email..." />
                    </Form.Item >

                    <Form.Item
                        key={3}
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Không được bỏ trống mật khẩu!',
                            },
                            {
                                validator(_, value) {
                                    if (!value || (value.length >= 6 && value.length <= 40)) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('Tối thiểu 6 hoặc tối đa 40 ký tự');
                                },
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password style={{
                            borderRadius: "8px",
                            textTransform: "none",
                            width: "100%",
                            height: 45,
                        }} onChange={onChange} placeholder='Nhập mật khẩu...' name="password" />
                    </Form.Item>

                    <Button
                        htmlType='submit'
                        style={{
                            borderRadius: "8px",
                            textTransform: "none",
                            marginTop: "10px",
                            width: "100%",
                            height: 45,
                        }}
                        className="title-hotel-right-btn"
                        variant="contained"
                        color="secondary"
                        type="danger"
                    >
                        <div
                            style={{
                                fontSize: "16px",
                                minHeight: "20px",
                                fontWeight: "600",
                            }}
                        >
                            Đăng Ký
                        </div>
                    </Button>
                    {message && (
                        <div className="form-group mt-2">
                            <div
                                className="alert alert-danger"
                                role="alert"
                            >
                                {message}
                            </div>
                        </div>
                    )}


                </div>
            </Form >
        </div >
    );
}

export default Register;