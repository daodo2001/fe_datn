import { Form, Input, Modal, notification } from 'antd';
import React from 'react';
import api from '../../../services/api'

function QuenMatKhau(props) {
    const { isModalVisible, setIsModalVisible } = props
    const [form] = Form.useForm();

    function handleCancel() {
        setIsModalVisible(false)
    }

    const onFinish = () => {
        const email = form.getFieldValue("email")
        const config = {
            method: "post",
            url: "/auth/forgot-password",
            params: {
                email
            }
        }
        api(config).then(res => {
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
        <Modal title="Quên mật khẩu"
            visible={isModalVisible}
            okText="Ok"
            cancelText="Hủy"
            onOk={form.submit}
            onCancel={handleCancel}
        >
            <Form
                form={form}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item label="Email" name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'Không đúng định dạng E-mail!',
                        },
                        {
                            required: true,
                            message: 'Không được bỏ trống E-mail!',
                        },
                    ]}>
                    <Input name="email" placeholder='Nhập email...' />
                </Form.Item>
            </Form>

        </Modal>
    );
}

export default QuenMatKhau;