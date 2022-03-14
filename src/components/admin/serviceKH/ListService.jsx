import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Image, Input, InputNumber, Modal, notification, Row, Table, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from '../../../services/api'

const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
        onSuccess("ok");
    }, 0);
};

function ListService(props) {

    const [service, setService] = useState()

    useEffect(() => {
        getService();
    }, [])

    const getService = () => {
        api.get("/owner/service-hotel").then(res => {
            console.log(res);
            setService(res.data.data)
        })
    }

    const getImageService = (image) => {
        if (image) {
            return `http://localhost:8080/api/rest/files/image_service/${image}`
        }
    }

    const columns = [
        {
            title: 'STT',
            key: 'index',
            render: (text, record, index) => index + 1

        },
        {
            title: 'Ảnh',
            dataIndex: 'image',
            render: text => <Image height={50} src={getImageService(text)} />,
            width: '20%'

        },
        {
            title: 'Tên dịch vụ',
            className: 'name',
            dataIndex: 'name',

        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: "price"

        },
        {
            title: 'Hành động',
            key: "Hành động",
            alight: "center",
            render: (record, index) => {
                return (
                    <Button ghost type="primary" onClick={() => showModal(record)}>
                        Sửa {record.name}
                    </Button>
                )
            },
            align: "center"
        },
    ];
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [imageOld, setImageOld] = useState()
    const [formData, setFormData] = useState({
        id: 0,
        name: "",
        price: 0,
        image: "",
    })

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

    const update = () => {
        var data = new FormData();
        data.append("service", JSON.stringify(formData))
        if (loading.imageName) {
            data.append('file', loading.imageName);
        }
        var config = {
            method: 'put',
            url: '/owner/service-hotel/image_service',
            headers: {
                "content-type": "multipart/form-data",
            },
            data: data
        };
        api(config).then(res => {
            const indexToUpdate = service.findIndex(
                (item) => item.id === res.data.data.id
            );
            const udpateService = [...service]; // creates a copy of the array

            udpateService[indexToUpdate].name = res.data.data.name
            udpateService[indexToUpdate].price = res.data.data.price
            udpateService[indexToUpdate].image = res.data.data.image
            setService(udpateService);
            notification["success"]({
                message: res.data.message,
            });
        }).catch(err => {
            console.log(err.response);
            notification["error"]({
                message: err.response.data.message,
            });
        })
        setIsModalVisible(false)
    }

    const onFinish = () => {
        update();
    }

    function showModal(record) {
        console.log(record);
        setFormData(record)
        setImageOld(record.image)
        setIsModalVisible(true)
    }

    function handleCancel() {
        setIsModalVisible(false)
    }

    useEffect(() => {
        const { name, price } = formData
        form.setFieldsValue({
            name, price
        })
    }, [formData])

    return (

        <div>
            <Modal title="Cập nhật dịch vụ"
                visible={isModalVisible}
                okText="Sửa dịch vụ"
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
                                        message: 'Không được bỏ trống tên!',
                                    },
                                ]}>
                                <Input onChange={(e) => setFormData({ ...formData, name: e.target.value })} name="name" />
                            </Form.Item>
                        </Col>
                        <Col span={18} key={2}>
                            <Form.Item label="Giá " name="price"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được bỏ trống giá!',
                                    },
                                ]}>
                                <InputNumber precision={0} min={0} max={2000000} onChange={(val) => setFormData({ ...formData, price: val })} name="price" />
                            </Form.Item>
                        </Col>
                        <Col span={18} key={3}>
                            <Form.Item label="Ảnh cũ "
                            >
                                <Image src={getImageService(imageOld)} />
                            </Form.Item>
                        </Col>
                        <Col span={18} key={4}>
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
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/admin">Admin</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Quản lý dịch vụ
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Danh sách dịch vụ
                    </li>
                </ol>
            </nav>
            <hr />
            <h3 className="text-center mb-2 mt-2">
                Dịch vụ phòng
            </h3>
            <hr />
            <Table
                columns={columns}
                dataSource={service}
                bordered
            />
        </div>
    );
}

export default ListService;
