import React, { useState } from "react";
import { Upload, notification, Card, Form, Input, Button, InputNumber, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import api from '../../../services/api'
import localJson from '../../../local.json'

const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
        onSuccess("ok");
    }, 0);
};

const { Option } = Select;
function CreateBranch() {
    const [form] = Form.useForm();
    const [listFile, setListFile] = useState([])
    const [address, setAddress] = useState(localJson)

    const formValue = {
        name: "",
        city: "",
        address: "",
    }

    const handleChange = ({ fileList }) => {
        setListFile(fileList)
    };


    function insert(hotel) {
        var data = new FormData();
        data.append("hotel", JSON.stringify(hotel))
        for (let i = 0; i < listFile.length; i++) {
            data.append('file', listFile[i].originFileObj);
        }

        var config = {
            method: 'post',
            url: '/owner/hotels/image_hotels',
            headers: {
                "content-type": "multipart/form-data",
            },
            data: data
        };
        api(config).then(res => {
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
        if (listFile.length < 5) {
            notification["error"]({
                message: "Bạn phải chọn tối thiểu 5 ảnh khách sạn",
            });
        }
        else {
            const { name, address } = fieldsValue;
            const hotel = {
                name, address, city: address,
            }
            insert(hotel);
        }
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
                        Quản lý cơ sở
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Thêm cơ sở
                    </li>
                </ol>
            </nav>
            <hr />
            <h3 className="text-center mb-2 mt-2">
                Thêm cơ sở
            </h3>
            <hr />
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

                    <Form.Item label="Tên cơ sở" name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Không được bỏ trống tên cơ sở!',
                            },
                        ]}>
                        <Input name="name" />
                    </Form.Item>
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

                    <Form.Item label="Ảnh khách sạn" name="image">
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
                            Thêm khách sạn
                        </Button>
                    </Form.Item>

                </Form>
            </Card>

        </div>
    );
}

export default CreateBranch;
