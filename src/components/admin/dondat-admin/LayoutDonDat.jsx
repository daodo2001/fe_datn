import { Col, Form, Row, Select, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../services/api'
const { Option } = Select;
function LayoutDonDat(props) {
    const { title, data, setIdHotel } = props;

    const [hotels, setHotels] = useState([])

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

    useEffect(() => {
        getHotels();
    }, [])

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
            title: 'Ngày đến',
            dataIndex: 'dateIn',
            key: 'dateIn',
        },
        {
            title: 'Ngày về',
            dataIndex: 'dateOut',
            key: 'dateOut',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Loại phòng ',
            dataIndex: 'nameTypeRoom',
            key: 'nameTypeRoom',
        },
        {
            title: 'Tổng số phòng',
            dataIndex: 'totalRooms',
            key: 'totalRooms',
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

        // {
        //     title: 'Lịch đã đổi',
        //     key: Math.random().toString(),
        //     render: (reason, record, index) => {
        //         console.log(record);
        //         return (
        //             <Popover
        //                 placement="leftTop"
        //                 title={<b>Chi tiết lịch đã đổi</b>}
        //                 content={() => (
        //                     <div>
        //                         <p>Ngày đổi : <b>{record.createDate}</b></p>
        //                         <p>Ngày đến mới: <b>{record.newDateIn}</b></p>
        //                         <p>Ngày về mới: <b>{record.newDateOut}</b></p>
        //                         <p>Tổng số phòng mới: <b>{record.newTotalRoom}</b></p>
        //                         <p>Loại phòng mới: <b>{record.newNameTypeRoom}</b></p>
        //                         <p>Người chuyển: <b>{record.username}</b></p>
        //                     </div>
        //                 )}
        //                 trigger="hover"
        //             >
        //                 <span
        //                     style={{
        //                         "color": "#1890ff", "textDecoration": "none",
        //                         "backgroundColor": "transparent", "outline": "none", "cursor": "pointer", "transition": "color 0.3s"
        //                     }}>
        //                     Chi tiết lịch đổi
        //                 </span>
        //             </Popover>
        //         )
        //     },
        // },
    ]
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/admin">Admin</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Danh sách đơn {title}
                    </li>

                </ol>
            </nav>
            <hr />
            <h3 className="text-center mb-2 mt-2">
                Danh sách đơn {title}
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
            <Table columns={columns} dataSource={data} />
        </div>
    );
}

export default LayoutDonDat;