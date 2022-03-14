import { Modal, Form, Input, Card, Button, Row, Col, notification } from 'antd';
import React from "react";
import api from '../../services/api'
function ForgotPassword(props) {
    const { isModalVisiblePW, handleCancelPW } = props;
    const [form] = Form.useForm();

    const onFinish = () => {
        const email = form.getFieldValue("email")
        console.log(email);
        const config = {
            method: "post",
            url: "/auth/forgot-password",
            params: {
                email
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
    return (
        <Modal
            width={400}
            okButtonProps={{ style: { display: "none" } }}
            cancelButtonProps={{ style: { display: "none" } }}
            visible={isModalVisiblePW}
            onCancel={handleCancelPW} >
            <Form form={form}
                onFinish={onFinish}>
                <Card>
                    <Row gutter={[20]}>
                        <Col span={24}>
                            <h3 style={{ textAlign: 'center' }}>Khôi phục mật khẩu</h3>
                        </Col>
                        <Col span={24}>
                            <p  >
                                Để đặt lại mật khẩu của mình, hãy nhập email mà bạn sử dụng để đăng nhập vào hệ thống.
                            </p>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                style={{
                                    marginTop: "10px",
                                    marginBottom: "40px",
                                    width: "100%",
                                    height: 30,
                                    borderRadius: "20px"
                                }}
                                key={1} name="email" rules={[
                                    {
                                        type: 'email',
                                        message: 'Không đúng định dạng E-mail!',
                                    },
                                    {
                                        required: true,
                                        message: 'Không được bỏ trống E-mail!',
                                    },
                                ]}>
                                <Input
                                    style={{
                                        width: "100%",
                                        height: 40,
                                        borderRadius: "5px"
                                    }}
                                    placeholder="Nhập email đăng ký..." />
                            </Form.Item>

                            <Button
                                style={{
                                    width: "100%",
                                    height: 40,
                                    borderRadius: "5px", border: 'none', backgroundColor: 'rgb(255, 51, 102)'
                                }}
                                type="primary" block htmlType='submit'>
                                Tiếp tục
                            </Button>
                        </Col>
                    </Row>
                </Card>
            </Form>
        </Modal >

    );
}
export default ForgotPassword;