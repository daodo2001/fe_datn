import React, { useState } from "react";
import { Upload, notification, Card, Form, Input, Button, InputNumber, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import api from '../../../services/api'

const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
        onSuccess("ok");
    }, 0);
};

const { Option } = Select;
function CreateTypeRoom() {
    const [form] = Form.useForm();
    const [listFile, setListFile] = useState([])
    const [typeRoom, setTypeRoom] = useState({})

    const formValue = {
        name: "",
        status: "",
        description: "",
        price: 0,
        size: 0,
        capacity: 0
    }

    const handleChange = ({ fileList }) => {
        setListFile(fileList)
    };


    const onChange = (event) => {
        const target = event.target;
        let name = target.name;
        let value = target.type === "checkbox" ? target.checked : target.value;
        setTypeRoom({ ...typeRoom, [name]: value })
    };

    const resetForm = () => {
        setTypeRoom(formValue)
    }

    function insert() {
        var data = new FormData();
        data.append("typeRoom", JSON.stringify(typeRoom))
        for (let i = 0; i < listFile.length; i++) {
            data.append('file', listFile[i].originFileObj);
        }

        var config = {
            method: 'post',
            url: '/owner/typerooms/image_type_room',
            headers: {
                "content-type": "multipart/form-data",
            },
            data: data
        };
        api(config).then(res => {
            resetForm();
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
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="!#">Admin</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Quản lý loại phòng
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Thêm loại phòng
                    </li>
                </ol>
            </nav>
            <hr />
            <h3 className="text-center mb-2 mt-2">
                Thêm loại phòng
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

                    <Form.Item label="Tên loại phòng" name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Không được bỏ trống tên loại phòng!',
                            },
                        ]}>
                        <Input name="name" onChange={onChange} />
                    </Form.Item>
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
                    <Form.Item label="Mô tả loại phòng" name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Không được bỏ trống mô tả loại phòng!',
                            },
                        ]}>
                        <Input name="description" onChange={onChange} />
                    </Form.Item>

                    <Form.Item label="Giá" name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Không được bỏ trống giá loại phòng!',
                            },
                        ]}>
                        <InputNumber min={0} name="price" onChange={(value) => setTypeRoom({ ...typeRoom, price: value })} />
                    </Form.Item>

                    <Form.Item label="Số lượng người " name="capacity"
                        rules={[
                            {
                                required: true,
                                message: 'Không được bỏ trống số lượng người!',
                            },
                        ]}>
                        <InputNumber min={1} name="capacity" onChange={(value) => setTypeRoom({ ...typeRoom, capacity: value })} />
                    </Form.Item>

                    <Form.Item label="Kích thường " name="kichThuoc"
                        rules={[
                            {
                                required: true,
                                message: 'Không được bỏ trống kích thước loại phòng!',
                            },
                        ]}>
                        <InputNumber min={1} max={50} name="size" onChange={(value) => setTypeRoom({ ...typeRoom, size: value })} />
                    </Form.Item>

                    <Form.Item label="Ảnh loại phòng" name="image">
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
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button ghost type="primary" htmlType="submit">
                            Thêm loại phòng
                        </Button>

                    </Form.Item>

                </Form>
            </Card>

        </div>
    );
}

export default CreateTypeRoom;
