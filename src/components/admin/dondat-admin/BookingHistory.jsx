import { Col, Form, Popover, Row, Select, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../services/api'

const { Option } = Select;
function BookingHistory(props) {
    const [bookingHistory, setBookingHistory] = useState([])
    const [hotels, setHotels] = useState([])
    const [idHotel, setIdHotel] = useState(null)

    const getHotels = () => {
        api.get("/owner/hotels").then((res) => {
            if (res.data !== null) {
                setHotels(res.data.data);
            } else {
                console.log(res.message);
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    const getBookingHistory = () => {
        const config = {
            method: "get",
            url: "/staff/booking-history",
            params: {
                idHotel
            }
        }
        api(config).then((res) => {
            setBookingHistory(res.data.data);
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        getHotels();
    }, [])

    useEffect(() => {
        getBookingHistory();
    }, [idHotel])

    const columns = [
        {
            title: 'STT',
            key: 'index',
            render: (text, record, index) => index + 1
        },
        {
            title: 'Họ Và Tên',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Ngày đến cũ',
            dataIndex: 'dateIn',
            key: 'dateIn',
        },
        {
            title: 'Ngày về cũ',
            dataIndex: 'dateOut',
            key: 'dateOut',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Loại phòng cũ',
            dataIndex: 'nameTypeRoom',
            key: 'nameTypeRoom',
        },
        {
            title: 'Tên cơ sở',
            dataIndex: 'nameHotel',
            key: '8',
            render: nameHotel => {
                let color = "";
                if (nameHotel === "Cơ sở 1") {
                    color = 'geekblue'
                } else if (nameHotel === "Cơ sở 2") {
                    color = 'green'
                }
                else if (nameHotel === "Cơ sở 3") {
                    color = 'red'
                }
                else if (nameHotel === "Cơ sở 4") {
                    color = 'cyan'
                } else {
                    color = 'purple'
                }
                return (
                    <Tag color={color} key={nameHotel}>
                        {nameHotel !== null ? nameHotel.toUpperCase() : ""}
                    </Tag>
                )
            }
        },
        {
            title: 'Tổng số phòng',
            dataIndex: 'totalRoom',
            key: 'totalRoom',
        },
        {
            title: 'Lịch đã đổi',
            key: Math.random().toString(),
            render: (reason, record, index) => {
                console.log(record);
                return (
                    <Popover
                        placement="leftTop"
                        title={<b>Chi tiết lịch đã đổi</b>}
                        content={() => (
                            <div>
                                <p>Ngày đổi : <b>{record.createDate}</b></p>
                                <p>Ngày đến mới: <b>{record.newDateIn}</b></p>
                                <p>Ngày về mới: <b>{record.newDateOut}</b></p>
                                <p>Tổng số phòng mới: <b>{record.newTotalRoom}</b></p>
                                <p>Loại phòng mới: <b>{record.newNameTypeRoom}</b></p>
                                <p>Người chuyển: <b>{record.username}</b></p>
                            </div>
                        )}
                        trigger="hover"
                    >
                        <span
                            style={{
                                "color": "#1890ff", "textDecoration": "none",
                                "backgroundColor": "transparent", "outline": "none", "cursor": "pointer", "transition": "color 0.3s"
                            }}>
                            Chi tiết lịch đổi
                        </span>
                    </Popover>
                )
            },
        },
    ]

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/admin">Admin</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Danh sách lịch sử đơn đặt
                    </li>

                </ol>
            </nav>
            <hr />
            <h3 className="text-center mb-2 mt-2">
                Danh sách lịch sử đơn đặt
            </h3>
            <hr />
            <Row>
                <Col span={8} key={1}></Col>
                <Col span={8} key={2}>
                    <Form.Item label="Chọn cơ sở muốn xem">
                        <Select
                            name="hotel"
                            onChange={(hotel) => {
                                setIdHotel(hotel)
                            }} placeholder="Chọn cơ sở">
                            <Option value={null}>Tất cả cơ sở</Option>
                            {hotels.map((item, index) => (
                                <Option key={index} value={item.id}>{item.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8} key={3}></Col>
            </Row>
            <Table columns={columns} dataSource={bookingHistory} />
        </div>
    );
}

export default BookingHistory;