import { Card, Form, Row, Input, Col, Button, notification } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import api from '../../../services/api'
import TokenService from "../../../services/token.service";

function DoiMatKhau(props) {

    const [form] = Form.useForm();

    const { id } = TokenService.getUser();

    function insert(oldPassword, newPassword) {
        const config = {
            method: "put",
            url: `/owner/user/change-password/${id}`,
            params: {
                oldPassword, newPassword
            }
        }
        api(config).then(res => {
            form.resetFields();
            notification["success"]({
                message: res.data.message,
            });
        }).catch(err => {
            notification["error"]({
                message: err.response.data.message,
            });
        })
    }

    const onFinish = () => {
        const oldPassword = form.getFieldValue('oldPassword')
        const newPassword = form.getFieldValue('newPassword')
        insert(oldPassword, newPassword);

    };

    return (

        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/admin">Admin</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Quản lý thông tin
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Đổi mật khẩu
                    </li>
                </ol>
            </nav>
            <hr />
            <h3 className="text-center mb-2 mt-2">
                Đổi mật khẩu
            </h3>
            <hr />
            <Card>
                <Form
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    layout="horizontal"
                    initialValues={{

                        prefix: '84',
                    }}
                    form={form}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Row>
                        <Col span={18} key={1}>
                            <Form.Item label="Mật khẩu cũ" name="oldPassword"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được bỏ trống Mật khẩu cũ!',
                                    },

                                ]}>
                                <Input.Password name="oldPassword" />
                            </Form.Item>
                        </Col>
                        <Col span={18} key={2}>
                            <Form.Item label="Mật khẩu mới" name="newPassword"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được bỏ trống mật khẩu mới!',
                                    },
                                    {
                                        validator(_, value) {
                                            if (!value || value.length >= 6) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject('Mật khẩu mới phải tối thiểu 6 ký tự');
                                        },
                                    },
                                ]}>
                                <Input.Password name="newPassword" />
                            </Form.Item>
                        </Col>
                        <Col span={18} key={2}>
                            <Form.Item label="Xác nhận mật khẩu mới" name="confirmNewPassword"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được bỏ trống xác nhận mật khẩu mới!',
                                    },
                                    {
                                        validator(_, value) {
                                            if (!value || value === form.getFieldValue('newPassword')) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject('Xác nhận mật khẩu phải giống với mật khẩu mới');
                                        },
                                    },
                                ]}>
                                <Input.Password name="confirmNewPassword" />
                            </Form.Item>
                        </Col>

                    </Row>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button ghost type="primary" htmlType="submit" style={{ marginLeft: '130px' }}>
                            Đổi mật khẩu
                        </Button>
                    </Form.Item>


                </Form>

            </Card>
        </div>
    );
}

export default DoiMatKhau;
