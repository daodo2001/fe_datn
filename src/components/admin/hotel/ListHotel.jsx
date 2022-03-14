import React, { useState, useEffect } from "react";
import api from "../../../services/api"
import { Table, Switch, Popconfirm, notification, Image, Button, Modal, Form, Input, Select, Upload, Row, Col } from 'antd';
import localJson from '../../../local.json'
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
const { Option } = Select;

const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
        onSuccess("ok");
    }, 0);
};
function ListHotel(props) {

    const [hotels, setHotels] = useState([])
    const [hotelEdit, setHotelEdit] = useState(null)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const msgLockHotel = `Bạn có chắc muốn khóa `
    const msgOpenHotel = `Bạn có chắc muốn mở khóa `
    const [address, setAddress] = useState(localJson)
    const [listFile, setListFile] = useState([])
    const [arrImageOld, setArrImageOld] = useState([])
    const [form] = Form.useForm();

    useEffect(() => {
        getHotels();
    }, [])

    useEffect(() => {

        var arrImage = hotelEdit && hotelEdit.images.split(",")
        setArrImageOld(arrImage)
        if (hotelEdit) {
            const { name, address } = hotelEdit
            form.setFieldsValue({
                name, address
            })
        }
    }, [hotelEdit])

    const getHotels = () => {
        api.get("/owner/hotels").then((res) => {
            console.log(res);
            if (res.data !== null) {
                setHotels(res.data.data);
            } else {
                console.log(res.message);
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    const getImage = (image) => {
        var showImage = "";

        if (image.indexOf(",") !== -1) {
            var arr = image.split(",")
            showImage = arr[0]
        } else {
            showImage = image
        }
        return `http://localhost:8080/api/rest/files/image_hotels/${showImage}`
    }


    function confirm(item) {
        var config = {
            method: 'put',
            url: `/owner/hotels/${item.id}`,
            headers: {
                "content-type": "multipart/form-data",
            },

        };
        api(config).then(res => {
            const indexToUpdate = hotels.findIndex(
                (hotel) => hotel.id === item.id
            );
            const updateHotels = [...hotels]; // creates a copy of the array

            updateHotels[indexToUpdate].isEnabled = res.data.data.isEnabled
            setHotels(updateHotels);
            notification["success"]({
                message: res.data.message,
            });
        }).catch(err => {
            notification["error"]({
                message: err.response.data.message,
            });
        })
    }

    const handleChange = ({ fileList }) => {
        setListFile(fileList)
    };

    const showModal = (record) => {
        console.log(record);
        setHotelEdit(record)
        setIsModalVisible(true)
    }

    const columns = [
        {
            title: 'Ảnh',
            dataIndex: 'images',
            key: '1',
            render: (images) => <Image src={getImage(images)} width={100} />
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: '2',
            sorter: (a, b) => a.name.localeCompare(b.name),
            render: text => <span>{text}</span>,
        },
        {
            title: 'Thành phố',
            dataIndex: 'city',
            key: '3',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: '4',
        },
        {
            title: 'Trạng thái',
            key: '5',
            dataIndex: 'isEnabled',
            render: (isEnabled, record) => (
                <Popconfirm placement="right" title={record.isEnabled === 1 ? `${msgLockHotel} ${record.name}` : `${msgOpenHotel} ${record.name}`} onConfirm={() => confirm(record)} okText="Yes" cancelText="No">
                    <Switch checkedChildren="Khóa" unCheckedChildren="Mở" checked={isEnabled} ></Switch>
                </Popconfirm>
            )
        },
        {
            title: 'Hành động',
            key: '6',
            render: (text, record) => (
                <Button onClick={() => showModal(record)} type="primary" ghost >Sửa {record.name}</Button>
            ),
        },
    ];

    const updateHotel = (hotelUpdate) => {
        var data = new FormData();
        data.append("hotel", JSON.stringify(hotelUpdate))
        if (listFile.length !== 0) {
            for (let i = 0; i < listFile.length; i++) {
                data.append('file', listFile[i].originFileObj);
            }
        }

        var config = {
            method: 'put',
            url: `/owner/hotels/image_hotels/${hotelEdit.id}`,
            headers: {
                "content-type": "multipart/form-data",
            },
            data: data
        };
        api(config).then(res => {
            const indexToUpdate = hotels.findIndex(
                (item) => item.id === res.data.data.id
            );
            const updateHotels = [...hotels]
            updateHotels[indexToUpdate] = res.data.data
            setHotels(updateHotels)
            setArrImageOld([])
            setIsModalVisible(false)
            form.resetFields();
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
    const onFinish = (fieldsValue) => {
        if (listFile.length >= 1 && listFile.length < 5) {
            notification["error"]({
                message: "Bạn phải chọn tối thiểu 5 ảnh khách sạn",
            });
        }
        else {
            const { name, address } = fieldsValue;
            const { id, isEnabled } = hotelEdit;
            const hotelUpdate = {
                id, isEnabled,
                name, address, city: address,
            }
            updateHotel(hotelUpdate);
        }
    }
    return (
        <div >
            {hotelEdit && <Modal
                width={1000}
                title="Cập nhật thông tin khách sạn"
                visible={isModalVisible}
                okText="Sửa"
                onOk={form.submit}
                onCancel={() => setIsModalVisible(false)}
            >
                <Form
                    labelCol={{
                        span: 7,
                    }}

                    layout="horizontal"
                    form={form}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Row>
                        <Col span={18}>
                            <Form.Item label="Tên" name="name">
                                <Input disabled name="name" />
                            </Form.Item>
                        </Col>
                        <Col span={18}>
                            <Form.Item label="Địa chỉ" name="address"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được bỏ trống địa chỉ!',
                                    },
                                ]}>
                                <Select
                                    placeholder="Danh sách địa chỉ">
                                    {address.map((item, index) => (
                                        <Option key={index} value={item.name}>{item.name}</Option>
                                    ))}

                                </Select>
                            </Form.Item>
                        </Col>

                        <Col span={18}>
                            <Form.Item label="Ảnh cũ" name="imageOld">
                                {
                                    arrImageOld && arrImageOld.map((item, index) => (
                                        <Image key={index}
                                            width={100}
                                            height={100}
                                            src={getImage(item)}
                                        />
                                    ))
                                }
                            </Form.Item>
                        </Col>

                        <Col span={18}>
                            <Form.Item label="Ảnh mới" name="image">
                                <Upload
                                    multiple={true}
                                    customRequest={dummyRequest}
                                    onChange={handleChange}
                                    listType="picture-card">
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>

            </Modal>}
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/admin">Admin</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Quản lý cơ sở
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Danh sách cơ sở
                    </li>
                </ol>
            </nav>
            <hr />
            <h3 className="text-center mb-2 mt-2">
                Danh sách cơ sở
            </h3>
            <hr />

            <Table columns={columns} dataSource={hotels} />
        </div>
    );
}

export default ListHotel;
