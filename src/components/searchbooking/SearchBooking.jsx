
import 'antd/dist/antd.css';
import { Input, Card, Row, Col, Modal, Form, Typography, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import api from '../../services/api'
const { Title } = Typography;

function SearchBooking(props) {
    const [booking, setBooking] = useState(null)
    const { Search } = Input;
    const { isModalVisibleSearch, setIsModalVisibleSearch } = props;
    const [form] = Form.useForm();

    const closeForm = () => {
        setBooking(null);
        setIsModalVisibleSearch(false);
        form.resetFields();
    }
    const onFinish = (fieldsValue) => {

        const { madondat } = fieldsValue;
        onSearch(madondat);
    }
    const onSearch = (data) => {
        const config = {
            method: "post",
            url: "/guest/code-bookings",
            data
        }
        api(config).then(res => {
            setBooking(res.data.data)
            notification["success"]({
                message: res.data.message,
            });
        }).catch(err => {
            setBooking(err.response.data.data)
            notification["error"]({
                message: err.response.data.message,
            });
        })
    }

    return (
        <Modal
            cancelButtonProps={{
                style: {
                    display: "none",
                },
            }} border-radius={100} width={650} title="Tìm kiếm đơn đặt phòng"
            visible={isModalVisibleSearch}
            // onOk={form.submit}
            okButtonProps={{ style: { display: "none" } }}
            onCancel={closeForm} >
            <Form form={form} onFinish={onFinish}  >
                <Card style={{ borderRadius: '15px' }}>
                    <Row gutter={[40, 15]}>
                        <Col span={24}>
                            <Form.Item name="madondat" rules={[
                                {
                                    required: true,
                                    message: 'Không được bỏ trống mã đơn đặt !',
                                },
                                {
                                    validator(_, value) {
                                        if (!value || (!isNaN(value))) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject("Mã đơn đặt là số ");
                                    },
                                },
                            ]}>
                                <Search style={{ height: "40px" }} placeholder="Nhập mã đơn đặt" allowClear />
                            </Form.Item>
                        </Col>
                        {booking &&
                            <>
                                <Col span={12}>
                                    <Title level={5}> Cơ sở: {booking.nameHotel}</Title>
                                </Col>
                                <Col span={12}>
                                    <Title level={5}> Loại phòng: {booking.nameTypeRoom}</Title>
                                </Col>
                                <Col span={12}>
                                    <Title level={5}> Ngày đến: {booking.dateIn}</Title>
                                </Col>
                                <Col span={12}>
                                    <Title level={5}> Ngày về: {booking.dateOut}</Title>
                                </Col>
                                <Col span={12}>
                                    <Title level={5}> Số lượng phòng: {booking.totalRooms}</Title>
                                </Col>
                                <Col span={12}>
                                    <Title level={5}> Tổng thanh toán: {booking.totalPrice}</Title>
                                </Col>
                                <Col span={12}>
                                    <Title level={5}> Mã đơn đặt: {booking.id}</Title>
                                </Col>
                                <Col span={12}>
                                    <Title level={5}> Trạng thái: Đã đặt cọc</Title>
                                </Col>
                            </>
                        }
                    </Row>
                </Card>

            </Form>
        </Modal >
    );
}
export default SearchBooking;