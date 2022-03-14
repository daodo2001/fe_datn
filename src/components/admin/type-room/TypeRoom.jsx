

import React, { useState, useEffect } from "react";
import api from "../../../services/api"
import { Button, Col, Divider, Form, Image, Input, InputNumber, Modal, notification, Row, Select, Table, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
        onSuccess("ok");
    }, 0);
};
const { Option } = Select;
function TypeRoom(props) {

    const [typeRooms, setTypeRooms] = useState([])
    const [idHotel] = useState(0)


    useEffect(() => {
        const getTypeRooms = () => {
            const config = {
                method: "get",
                url: "/owner/typerooms",
            }
            api(config).then((res) => {
                console.log(res);
                if (res.data !== null) {
                    setTypeRooms(res.data.data);
                } else {
                    console.log(res.message);
                }
            }).catch((err) => {
                console.log(err);
            });
        }
        getTypeRooms();
    }, [idHotel])


    const getImageTypeRoom = (image) => {
        if (image) {
            return `http://localhost:8080/api/rest/files/image_type_room/${image}`
        }
    }

    const onChange = (event) => {
        const target = event.target;
        let name = target.name;
        let value = target.type === "checkbox" ? target.checked : target.value;
        setTypeRoom({ ...typeRoom, [name]: value })
    };

    const columns = [
        {
            title: 'STT',
            key: 'index',
            render: (text, record, index) => index + 1
        },
        {
            title: 'Tên loại phòng',
            dataIndex: 'typeRoomImages',
            render: (typeRoomImages) => {
                return (
                    <img alt="" width={100} src={getImageTypeRoom(typeRoomImages[0]?.image)} />
                )
            },
            key: () => Math.random().toString(),
        },

        {
            title: 'Tên loại phòng',
            dataIndex: 'name',
            key: () => Math.random().toString(),
        },
        {
            title: 'Giá loại phòng',
            dataIndex: 'price',
            key: () => Math.random().toString(),
        },
        {
            title: 'Kích thước phòng',
            dataIndex: 'size',
            key: () => Math.random().toString(),

        },
        {
            title: 'Số lượng chứa',
            dataIndex: 'capacity',
            key: () => Math.random().toString(),

        },
        {
            title: 'Trạng thái',
            key: () => Math.random().toString(),
            dataIndex: 'status',
        },
        {
            title: 'Action',
            key: () => Math.random().toString(),
            render: (text, record) => (
                <>
                    <Button ghost type="primary" onClick={() => showModal(record)}>
                        Sửa {record.name}
                    </Button>
                </>
            ),
        },
    ];

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [typeRoom, setTypeRoom] = useState({})
    const [imageOld, setImageOld] = useState()
    const [loading, setLoading] = useState({
        loading: false
    })

    const uploadButton = (
        <div>
            {loading.loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true)
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                setLoading({
                    loading: false,
                    imageUrl,
                    imageName: info.file.originFileObj
                })
            );
        }

    };
    const showModal = (record) => {
        setImageOld(record.typeRoomImages[0]?.image)
        setIsModalVisible(true)
        setTypeRoom(record)
    }

    useEffect(() => {
        const { name, capacity, description, price, size, status } = typeRoom;
        form.setFieldsValue({
            name,
            capacity,
            description,
            price,
            kichThuoc: size,
            trangThai: status
        })
    }, [typeRoom])

    function handleCancel() {
        setIsModalVisible(false)
    }
    const update = () => {
        var data = new FormData();
        data.append("typeRoom", JSON.stringify(typeRoom))
        if (loading.imageName) {
            data.append('file', loading.imageName);
        }
        var config = {
            method: 'put',
            url: '/owner/typerooms/image_type_room',
            headers: {
                "content-type": "multipart/form-data",
            },
            data: data
        };
        api(config).then(res => {
            console.log(res);
            const indexToUpdate = typeRooms.findIndex(
                (item) => item.id === res.data.data.id
            );
            const udpateTypeRooms = [...typeRooms]; // creates a copy of the array

            udpateTypeRooms[indexToUpdate] = res.data.data
            // udpateTypeRooms[indexToUpdate].name = res.data.data.name
            // udpateTypeRooms[indexToUpdate].price = res.data.data.price
            // udpateTypeRooms[indexToUpdate].description = res.data.data.description
            // udpateTypeRooms[indexToUpdate].capacity = res.data.data.capacity
            // udpateTypeRooms[indexToUpdate].size = res.data.data.size
            // udpateTypeRooms[indexToUpdate].status = res.data.data.status
            // udpateTypeRooms[indexToUpdate].typeRoomImages = res.data.data.typeRoomImages
            setTypeRooms(udpateTypeRooms);
            setLoading('')
            notification["success"]({
                message: res.data.message,
            });
        }).catch(err => {
            console.log(err.response);
        })
        setIsModalVisible(false)
    }

    const onFinish = () => {
        update();
    }

    return (
        <div className="container">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="#!">Admin</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Quản lý loại phòng
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Danh sách loại phòng
                    </li>
                </ol>
            </nav>
            <hr />
            <h3 className="text-center mb-2 mt-2">
                Loại phòng
            </h3>
            <Modal title="Cập nhật loại phòng"
                visible={isModalVisible}
                okText="Sửa loại phòng"
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
                            <Form.Item label="Tên" name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được bỏ trống tên loại phòng!',
                                    },
                                ]}>
                                <Input name="name" onChange={onChange} />
                            </Form.Item>
                        </Col>
                        <Col span={18} key={2}>
                            <Form.Item label="Trạng thái" name="trangThai"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được bỏ trống thành phố!',
                                    },
                                ]}>
                                <Select name="id_hotel" onChange={(value) => setTypeRoom({ ...typeRoom, status: value })} placeholder="Chọn trạng thái">

                                    <Option value="Hoạt động">Hoạt động</Option>
                                    <Option value="Không hoạt động">Không hoạt động</Option>

                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={18} key={3}>
                            <Form.Item label="Mô tả " name="description"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được bỏ trống mô tả loại phòng!',
                                    },
                                ]}>
                                <Input onChange={onChange} name="description" />
                            </Form.Item>
                        </Col>
                        <Col span={18} key={4}>
                            <Form.Item label="Giá" name="price"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được bỏ trống giá loại phòng!',
                                    },
                                ]}>
                                <InputNumber min={0} name="price" onChange={(value) => setTypeRoom({ ...typeRoom, price: value })} />
                            </Form.Item>
                        </Col>
                        <Col span={18} key={5}>
                            <Form.Item label="Số lượng" name="capacity"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được bỏ trống số lượng người!',
                                    },
                                ]}>
                                <InputNumber min={1} name="capacity" onChange={(value) => setTypeRoom({ ...typeRoom, capacity: value })} />
                            </Form.Item>
                        </Col>
                        <Col span={18} key={6}>
                            <Form.Item label="Kích thường" name="kichThuoc"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được bỏ trống kích thước loại phòng!',
                                    },
                                ]}>
                                <InputNumber min={1} max={50} name="size" onChange={(value) => setTypeRoom({ ...typeRoom, size: value })} />
                            </Form.Item>
                        </Col>
                        {imageOld &&
                            <Col span={18} key={8}>
                                <Form.Item label="Ảnh cũ "
                                >
                                    <Image src={getImageTypeRoom(imageOld)} />
                                </Form.Item>
                            </Col>
                        }
                        <Col span={18} key={7}>
                            <Form.Item label="Ảnh mới " name="image"
                            >
                                <Upload
                                    multiple={false}
                                    customRequest={dummyRequest}
                                    onChange={handleChange}
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}>

                                    {loading.imageUrl ? <img src={loading.imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>
                            </Form.Item>
                        </Col>

                    </Row>
                </Form>

            </Modal>

            <Table columns={columns} dataSource={typeRooms} />
        </div>
    );
}

export default TypeRoom;
