import React, { useState, useEffect } from "react";
import api from "../../../services/api"
import { Table, Switch, Popconfirm, Col, Form, Select, Tag, Row, notification, Popover, Image } from 'antd';



const { Option } = Select
function ListRoom(props) {

    const [rooms, setRooms] = useState([])
    const [hotels, setHotels] = useState([])
    const [idHotel, setIdHotel] = useState(0)
    const [idTypeRoom, setIdTypeRoom] = useState(null)
    const [typeRooms, setTypeRooms] = useState([])

    useEffect(() => {
        getHotels();
        getTypeRooms();
        if (idHotel !== 0) {
            getRooms();
        }
    }, [idHotel, idTypeRoom])

    const getTypeRooms = () => {
        api.get("/owner/typerooms").then(res => {
            setTypeRooms(res.data.data)
        })
    }

    const getHotels = () => {
        api.get("/owner/hotels").then(res => {
            setHotels(res.data.data)
        })
    }

    const getRooms = () => {
        const config = {
            params: {
                idHotel, idTypeRoom
            }
        }
        api.get("/owner/rooms", config).then((res) => {
            console.log(res);
            if (res.data !== null) {
                setRooms(res.data.data);
            } else {
                console.log(res.message);
            }
        }).catch((err) => {
            console.log(err);
        });
    }



    function confirm(item) {
        var config = {
            method: 'put',
            url: `/owner/rooms/${item.id}`,
        };
        api(config).then(res => {
            console.log(res);

            const indexToUpdate = rooms.findIndex(
                (room) => room.id === item.id
            );
            const updateRooms = [...rooms]; // creates a copy of the array
            updateRooms[indexToUpdate].enabled = res.data.data.enabled
            updateRooms[indexToUpdate].description = res.data.data.description
            setRooms(updateRooms);
            notification["success"]({
                message: res.data.message,
            });
        }).catch(err => {
            console.log(err);
        })
    }

    const msgLockRoom = `Bạn có chắc muốn khóa phòng `
    const msgOpenRoom = `Bạn có chắc muốn mở khóa phòng `

    const getImageTienIch = (image) => {
        if (image) {
            return `http://localhost:8080/api/rest/files/image_utilities/${image}`
        }
    }

    const columns = [
        {
            title: 'STT',
            key: 'index',
            render: (text, record, index) => index + 1
        },
        {
            title: 'Tên phòng',
            dataIndex: 'numberRoom',
            key: 'numberRoom',
        },
        {
            title: 'Tình trạng phòng',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Mô tả phòng',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Thể loại phòng',
            dataIndex: 'nameTypeRoom',
            key: 'nameTypeRoom',
            render: nameTypeRoom => {
                let color;
                if (nameTypeRoom === "Phòng đơn") {
                    color = 'geekblue'
                } else if (nameTypeRoom === "Phòng đôi") {
                    color = 'green'
                }
                else if (nameTypeRoom === "Phòng vip") {
                    color = 'red'
                }
                return (
                    <Tag color={color} key={nameTypeRoom}>
                        {nameTypeRoom !== null ? nameTypeRoom.toUpperCase() : ""}
                    </Tag>
                )
            }
        },
        {
            title: 'Trạng thái',
            key: 'enabled',
            dataIndex: 'enabled',
            render: (enabled, record) => (
                <Popconfirm placement="right" title={record.enabled ? `${msgLockRoom} ${record.numberRoom}` : `${msgOpenRoom} ${record.numberRoom}`} onConfirm={() => confirm(record)} okText="Yes" cancelText="No">
                    <Switch checked={record.enabled} >
                    </Switch>
                </Popconfirm>
            )
        },
        {
            title: 'Tiện ích phòng',
            key: '1',
            dataIndex: 'imagesTienIch',
            render: (imagesTienIch, record, index) => {
                return (
                    <Popover
                        placement="left"
                        title={`Chi tiết tiện ích phòng`}
                        content={() => (
                            imagesTienIch.map((item, idx) => (
                                <p key={idx}>
                                    <Image width={150} src={getImageTienIch(item)} />
                                </p>
                            ))
                        )}
                        trigger="hover"
                    >
                        <a href="#!">Chi tiết tiện ích </a>
                    </Popover>
                )
            },
        },
    ];



    return (
        <div className="container">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="#!">Admin</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Quản lý phòng
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Danh sách phòng
                    </li>
                </ol>
            </nav>
            <hr />
            <Row >
                <Col span={8} key={5}>
                    <Form.Item
                        name="gender"
                        label="Chọn cơ sở"
                    >
                        <Select placeholder="Chọn cơ sở" onChange={(id) => setIdHotel(id)}>
                            {hotels.map((item, index) => (
                                <Option key={index} value={item.id}>{item.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col span={8} key={7}>

                </Col>

                <Col span={8} key={6}>
                    <Form.Item
                        label="Chọn loại phòng"
                    >
                        <Select placeholder="Chọn loại phòng" onChange={(id) => setIdTypeRoom(id)}>
                            <Option key={Math.random().toString()} value={null}>Tất cả loại phòng</Option>
                            {typeRooms.map((item, index) => (
                                <Option key={index} value={item.id}>{item.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Table columns={columns} dataSource={rooms} />
        </div>
    );
}

export default ListRoom;
