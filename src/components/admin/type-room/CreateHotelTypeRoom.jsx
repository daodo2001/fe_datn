import React, { useEffect, useState } from 'react';
import { Button, Card, Form, InputNumber, notification, Select } from "antd";
import api from '../../../services/api';
const { Option } = Select;
function CreateHotelTypeRoom(props) {

    const [hotelTypeRoom, setHotelTypeRoom] = useState({
        idHotel: 0,
        idTypeRoom: 0,
        totalNumberRoom: 0
    })
    const [form] = Form.useForm();
    const [hotels, setHotels] = useState([])
    const [typeRooms, setTypeRooms] = useState([])

    useEffect(() => {
        api.get("/owner/hotels").then(res => {
            setHotels(res.data.data)
        })
        api.get("/owner/typerooms").then(res => {
            setTypeRooms(res.data.data)
        })

    }, [])

    function insert() {
        var config = {
            method: 'post',
            url: '/owner/hotel-type-room',
            data: hotelTypeRoom
        };
        api(config).then(res => {

            notification["success"]({
                message: res.data.message,
            });
        }).catch(err => {
            console.log(err.response);
            notification["error"]({
                message: err.response.data.message,
            });
        })
    }

    const onFinish = () => {
        insert();
        form.resetFields();
    };

    const [componentSize] = useState('default');

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="!#">Admin</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Quản lý loại phòng
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Thêm số phòng khách sạn
                    </li>
                </ol>
            </nav>
            <hr />
            <h3 className="text-center mb-2 mt-2">
                Thêm phòng
            </h3>
            <Card className="main-container">
                <Form
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    layout="horizontal"
                    initialValues={{
                        size: componentSize,
                    }}
                    form={form}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item label="Tên cơ sở" name="idHotel"
                        rules={[
                            {
                                required: true,
                                message: 'Không được bỏ trống tên cơ sở!',
                            },
                        ]}>
                        <Select name="idHotel" placeholder="Chọn cơ sở"
                            onChange={(value) => setHotelTypeRoom({ ...hotelTypeRoom, idHotel: value })}>
                            {hotels.map((item, index) => (
                                <Option key={index} value={item.id}>{item.name}</Option>
                            ))}


                        </Select>
                    </Form.Item>
                    <Form.Item label="Tên loại phòng" name="idTypeRoom"
                        rules={[
                            {
                                required: true,
                                message: 'Không được bỏ trống tên loại phòng!',
                            },
                        ]}>
                        <Select name="idTypeRoom" placeholder="Chọn loại phòng"
                            onChange={(value) => setHotelTypeRoom({ ...hotelTypeRoom, idTypeRoom: value })}>

                            {typeRooms.map((item, index) => (
                                <Option key={index} value={item.id}>{item.name}</Option>
                            ))}

                        </Select>
                    </Form.Item>
                    <Form.Item label="Tổng số phòng" name="totalNumberRoom"
                        rules={[
                            {
                                required: true,
                                message: 'Không được bỏ trống số phòng trong khách sạn!',
                            },
                        ]}>
                        <InputNumber min={1} name="totalNumberRoom" onChange={(value) => setHotelTypeRoom({ ...hotelTypeRoom, totalNumberRoom: value })} />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button ghost type="primary" htmlType="submit">
                            Thêm số phòng khách sạn
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </>
    );
}

export default CreateHotelTypeRoom;