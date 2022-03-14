
import React from 'react';
import 'antd/dist/antd.css';
import { Input, Card, Button, Form, Row, Col, notification } from 'antd';
import TokenService from '../../services/token.service';
import api from '../../services/api'
function ChangePasswordUser(props) {
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
        < >
            <Card>
                <Row gutter={[20]}>
                    <Col span={24}>
                        <h3 style={{ textAlign: 'center' }}>Đổi mật khẩu</h3>
                    </Col>
                    <Col span={8}>
                    </Col>
                    <Col span={8}>
                        <Form form={form} onFinish={onFinish}>
                            <Form.Item style={{
                                marginTop: "10px",
                                marginBottom: "40px",
                                width: "100%",
                                height: 30,
                                borderRadius: "20px"
                            }} key={1} name="oldPassword" rules={[
                                {
                                    required: true,
                                    message: 'Không được bỏ trống mật khẩu cũ!',
                                },
                            ]}>
                                <Input.Password style={{
                                    width: "100%",
                                    height: 40,
                                    borderRadius: "5px"
                                }} placeholder="Nhập mật khẩu cũ..." />
                            </Form.Item>
                            <Form.Item style={{
                                marginTop: "10px",

                                marginBottom: "40px",
                                width: "100%",
                                height: 30,
                                borderRadius: "20px"
                            }} key={2} name="newPassword" rules={[
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
                                <Input.Password style={{
                                    width: "100%",
                                    height: 40,
                                    borderRadius: "5px"
                                }} placeholder="Nhập mật khẩu mới..." />
                            </Form.Item>
                            <Form.Item style={{
                                marginTop: "10px",

                                marginBottom: "40px",
                                width: "100%",
                                height: 30,
                                borderRadius: "20px"
                            }} key={3} name="confirmNewPassword" rules={[
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
                                <Input.Password style={{
                                    width: "100%",
                                    height: 40,
                                    borderRadius: "5px"
                                }} placeholder="Nhập lại mật khẩu mới..." />
                            </Form.Item>
                            <Button style={{
                                width: "100%",
                                height: 40,
                                borderRadius: "5px", border: 'none',
                                backgroundColor: 'rgb(255, 51, 102)'
                            }} type="primary" htmlType='submit' block>
                                Đổi mật khẩu
                            </Button>
                        </Form>
                    </Col>
                    <Col span={8}>
                    </Col>
                </Row>
            </Card>

        </>
    );
}

export default ChangePasswordUser;