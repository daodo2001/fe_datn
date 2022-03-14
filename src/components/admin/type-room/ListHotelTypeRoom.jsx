
import { Button, Col, Form, Input, InputNumber, Modal, notification, Row, Table, Tag } from "antd";
import React, { useEffect, useRef, useState } from "react";
import api from '../../../services/api';
function ListHotelTypeRoom() {
    const [form] = Form.useForm();
    const [hotelTypeRooms, setHotelTypeRooms] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [formData, setFormData] = useState({

    })
    useEffect(() => {
        api.get("/owner/hotel-type-room").then(res => {
            console.log(res);
            setHotelTypeRooms(res.data.data)
        })
    }, [])

    const columns = [
        {
            title: 'STT',
            key: 'index',
            render: (text, record, index) => index + 1
        },

        {
            title: 'Tên cơ sở',
            dataIndex: 'nameHotel',
            key: 'name',
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
            title: 'Tên loại phòng',
            dataIndex: 'nameTypeRoom',
            key: 'city',
        },

        {
            title: 'Tổng số phòng',
            key: 'totalNumberRoom',
            dataIndex: 'totalNumberRoom',
            sorter: (a, b) => a.totalNumberRoom - b.totalNumberRoom
        },
        {
            title: 'Hành động',
            key: () => Math.random().toString(),
            render: (text, record) => (
                <>
                    <Button ghost onClick={() => showModal(record)} type="primary" >
                        Sửa số phòng
                    </Button>
                </>
            ),
        },
    ];

    function handleCancel() {
        setIsModalVisible(false)
    }

    const update = () => {
        const { id, idHotel, idTypeRoom, totalNumberRoom } = formData
        const config = {
            method: "put",
            url: "/owner/hotel-type-room",
            data: {
                id, idHotel, idTypeRoom, totalNumberRoom
            }
        }
        api(config).then(res => {
            const indexToUpdate = hotelTypeRooms.findIndex(
                (item) => item.id === res.data.data.id
            );
            const newHotelTypeRooms = [...hotelTypeRooms]
            newHotelTypeRooms[indexToUpdate].totalNumberRoom = res.data.data.totalNumberRoom
            setHotelTypeRooms(newHotelTypeRooms);
            notification["success"]({
                message: res.data.message,
            });
            setIsModalVisible(false)
        }).catch(err => {
            console.log(err);
            notification["error"]({
                message: err.response.data.message,
            });
        })
    }

    function onFinish() {
        update();
    }
    function showModal(record) {
        console.log(record);
        setFormData(record)
        setIsModalVisible(true)
    }

    useEffect(() => {
        const { nameHotel, nameTypeRoom, totalNumberRoom } = formData
        form.setFieldsValue({
            nameHotel, nameTypeRoom, totalNumberRoom
        })
    }, [formData])
    const typingTimeoutref = useRef(null);
    const [keyword, setKeyword] = useState("");

    const onSearch = (event) => {
        const target = event.target;
        let value = target.type === "checkbox" ? target.checked : target.value;

        if (typingTimeoutref.current) {
            clearTimeout(typingTimeoutref.current);
        }

        typingTimeoutref.current = setTimeout(() => {
            setKeyword(value);
        }, 300);
    };
    var newHotelTypeRooms = null;

    if (Array.isArray(hotelTypeRooms)) {
        newHotelTypeRooms = [...hotelTypeRooms];
    }
    if (keyword) {
        newHotelTypeRooms = newHotelTypeRooms.filter((item) => {
            return (
                item.nameHotel.toLowerCase().indexOf(keyword.toLowerCase()) !==
                -1
            );
        });
    }


    return (
        <div>
            <Modal title="Cập nhật số phòng"
                visible={isModalVisible}
                okText="Sửa số phòng"
                cancelText="Hủy"
                onOk={form.submit}
                onCancel={handleCancel}
            >
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
                            <Form.Item label="Tên cơ sở" name="nameHotel">
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={18} key={2}>
                            <Form.Item label="Tên" name="nameTypeRoom">
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={18} key={3}>
                            <Form.Item label="Số phòng" name="totalNumberRoom"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được bỏ trống giá!',
                                    },
                                ]}>
                                <InputNumber onChange={val => setFormData({ ...formData, totalNumberRoom: val })} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="!#">Admin</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Quản lý loại phòng
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Danh sách số phòng khách sạn
                    </li>
                </ol>
            </nav>
            <hr />
            <h3 className="text-center mb-2 mt-2">
                Danh sách số phòng khách sạn
            </h3>
            <hr />
            <Row>
                <Col span={8} key={1}>

                </Col>
                <Col span={8} key={2}>
                    <Form.Item label="Tìm kiếm" name="timKiem"
                    >
                        <Input name="nameHotel" onChange={onSearch} value={keyword} placeholder="Nhập tên cơ sở..." />
                    </Form.Item>
                </Col>
                <Col span={8} key={3}>

                </Col>
            </Row>
            <Table columns={columns} dataSource={newHotelTypeRooms} />

        </div>
    );
}

export default ListHotelTypeRoom;
