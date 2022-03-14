import React, { useState, useEffect } from 'react';
import { Card, Form, Row, Col, Button, Select, InputNumber, notification } from "antd";
import api from '../../../services/api'
const { Option } = Select;
function AddUtilitiesRoom(props) {
    const [hotels, setHotels] = useState([])
    const [typeRooms, setTypeRooms] = useState([])
    const [utility, setUtility] = useState([])
    const [typeRoomUtilityRequest, setTypeRoomUtilityRequest] = useState({
        idHotel: 0,
        idTienIch: 0,
        idTypeRoom: 0
    })

    useEffect(() => {
        api.get("/owner/hotels").then(res => {
            setHotels(res.data.data)
        })
        api.get("/owner/typerooms").then(res => {
            setTypeRooms(res.data.data)
        })
        api.get("/owner/utilities").then(res => {
            setUtility(res.data.data)
        })
    }, [])

    const [form] = Form.useForm();
    const insert = () => {
        const config = {
            method: "post",
            url: "/owner/utilities/type-room-utility",
            data: typeRoomUtilityRequest
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
    const onFinish = () => {
        insert();
        form.resetFields();
    }

    return (
        <Card>
            <Form
                form={form}
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
                onFinish={onFinish}
                autoComplete="off"
            >
                <Row>
                    <Col span={12} key={1}>
                        <Form.Item label="Tiện ích" name="utilites"
                            rules={[
                                {
                                    required: true,
                                    message: 'Không được bỏ trống loại tiện ích!',
                                },
                            ]}>
                            <Select
                                onChange={(value) =>
                                    setTypeRoomUtilityRequest({ ...typeRoomUtilityRequest, idTienIch: value })}
                                defaultValue="Chọn tiện ích" style={{ width: 230 }} >
                                {utility.map((item, index) => (
                                    <Option key={index} value={item.id}>{item.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12} key={2}>
                        <Form.Item label="Cơ sở" name="coso"
                            rules={[
                                {
                                    required: true,
                                    message: 'Không được bỏ trống cơ sở!',
                                },
                            ]}>
                            <Select
                                onChange={(value) =>
                                    setTypeRoomUtilityRequest({ ...typeRoomUtilityRequest, idHotel: value })}
                                defaultValue="Chọn cơ sở" style={{ width: 230 }}>
                                {hotels.map((item, index) => (
                                    <Option key={index} value={item.id}>{item.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={12} key={3}>
                        <Form.Item label="Loại Phòng" name="typeroom"
                            rules={[
                                {
                                    required: true,
                                    message: 'Không được bỏ trống loại phòng!',
                                },
                            ]}>
                            <Select
                                onChange={(value) =>
                                    setTypeRoomUtilityRequest({ ...typeRoomUtilityRequest, idTypeRoom: value })}
                                defaultValue="Chọn loại phòng" style={{ width: 230 }} >
                                {typeRooms.map((item, index) => (
                                    <Option key={index} value={item.id}>{item.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12} key={4}>
                        <Form.Item label="Số lượng" name="number"
                        >
                            <InputNumber style={{ width: 230 }} min={1} max={10} defaultValue={1} />
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
                        Thêm tiện ích phòng
                    </Button>
                </Form.Item>


            </Form>
        </Card>
    );
}

export default AddUtilitiesRoom;